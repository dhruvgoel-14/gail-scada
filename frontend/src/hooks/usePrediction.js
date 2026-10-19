import { useState, useEffect } from 'react'
import { predictSensorData } from '../api/api'

export function usePrediction(currentRow) {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!currentRow) return

    const payload = {
      pressure: currentRow.pressure,
      flow_rate: currentRow.flow_rate,
      temperature: currentRow.temperature,
      valve_status: currentRow.valve_status,
      pump_state: currentRow.pump_state,
      pump_speed: currentRow.pump_speed,
      compressor_state: currentRow.compressor_state,
      energy_consumption: currentRow.energy_consumption
    }

    setLoading(true)
    predictSensorData(payload)
      .then((result) => {
        setPrediction(result)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [currentRow])

  return { prediction, loading, error }
}