from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import json
import pandas as pd
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model once, when the server starts
model = joblib.load("models/fault_model.pkl")

# Load the exact feature order the model expects
with open("models/feature_names.json") as f:
    feature_names = json.load(f)


class SensorData(BaseModel):
    pressure: float
    flow_rate: float
    temperature: float
    valve_status: int
    pump_state: int
    pump_speed: float
    compressor_state: int
    energy_consumption: float


@app.get("/")
def read_root():
    return {"message": "SCADA backend is running"}


@app.post("/predict")
def predict(data: SensorData):
    input_df = pd.DataFrame([data.dict()])[feature_names]

    prediction = model.predict(input_df)[0]
    probabilities = model.predict_proba(input_df)[0]

    fault_probability = float(probabilities[1])
    normal_probability = float(probabilities[0])
    confidence = max(fault_probability, normal_probability) * 100

    return {
        "prediction": "Fault" if prediction == 1 else "Normal",
        "confidence": round(confidence, 2),
        "fault_probability": round(fault_probability * 100, 2),
        "normal_probability": round(normal_probability * 100, 2)
    }


@app.get("/metrics")
def get_metrics():
    with open("models/metrics.json") as f:
        return json.load(f)


@app.get("/feature-importance")
def get_feature_importance():
    with open("models/feature_importance.json") as f:
        return json.load(f)


@app.post("/predict-csv")
async def predict_csv(file: UploadFile = File(...)):
    contents = await file.read()
    csv_df = pd.read_csv(io.BytesIO(contents))

    input_df = csv_df[feature_names]

    predictions = model.predict(input_df)
    probabilities = model.predict_proba(input_df)

    results = []
    for i in range(len(predictions)):
        results.append({
            "row": i,
            "prediction": "Fault" if predictions[i] == 1 else "Normal",
            "fault_probability": round(float(probabilities[i][1]) * 100, 2)
        })

    total = len(predictions)
    faults = int(sum(predictions))
    normal = total - faults

    return {
        "total_samples": total,
        "faults": faults,
        "normal": normal,
        "results": results
    }