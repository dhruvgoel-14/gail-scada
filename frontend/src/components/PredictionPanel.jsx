function PredictionPanel({ prediction, loading, error }) {
  if (error) {
    return (
      <div className="prediction-panel">
        <p style={{ color: 'red' }}>⚠ Backend connection error: {error}</p>
      </div>
    )
  }

  if (loading || !prediction) {
    return (
      <div className="prediction-panel">
        <p>Analyzing sensor data...</p>
      </div>
    )
  }

  const isFault = prediction.prediction === 'Fault'
  const riskLevel = prediction.fault_probability > 80 ? 'HIGH'
    : prediction.fault_probability > 40 ? 'MODERATE'
    : 'LOW'

  return (
    <div className={`prediction-panel ${isFault ? 'fault' : 'normal'}`}>
      <p className="prediction-status">
        {isFault ? '🔴 Fault Detected' : '🟢 Normal Operation'}
      </p>
      <div className="prediction-details">
        <div>
          <p className="detail-label">Confidence</p>
          <p className="detail-value">{prediction.confidence}%</p>
        </div>
        <div>
          <p className="detail-label">Fault Probability</p>
          <p className="detail-value">{prediction.fault_probability}%</p>
        </div>
        <div>
          <p className="detail-label">Normal Probability</p>
          <p className="detail-value">{prediction.normal_probability}%</p>
        </div>
        <div>
          <p className="detail-label">Risk Level</p>
          <p className="detail-value">{riskLevel}</p>
        </div>
      </div>
    </div>
  )
}

export default PredictionPanel