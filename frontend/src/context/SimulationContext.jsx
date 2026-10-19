import { createContext, useContext } from 'react'
import { useSimulation } from '../hooks/useSimulation'
import { usePrediction } from '../hooks/usePrediction'
import { usePredictionHistory } from '../hooks/usePredictionHistory'

const SimulationContext = createContext(null)

export function SimulationProvider({ children }) {
  const simulation = useSimulation(2000)
  const { prediction, loading, error } = usePrediction(simulation.currentRow)
  const historyLog = usePredictionHistory(prediction, simulation.currentIndex)

  const value = {
    ...simulation,
    prediction,
    loading,
    error,
    historyLog
  }

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulationContext() {
  return useContext(SimulationContext)
}