import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

export const predictSensorData = async (sensorData) => {
  const response = await axios.post(`${API_BASE_URL}/predict`, sensorData)
  return response.data
}

export const getMetrics = async () => {
  const response = await axios.get(`${API_BASE_URL}/metrics`)
  return response.data
}

export const getFeatureImportance = async () => {
  const response = await axios.get(`${API_BASE_URL}/feature-importance`)
  return response.data
}

export const predictCSV = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post(`${API_BASE_URL}/predict-csv`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}