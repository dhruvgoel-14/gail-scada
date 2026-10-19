import { useState, useEffect } from 'react'

const MAX_HISTORY_ROWS = 15

export function usePredictionHistory(prediction, currentIndex) {
  const [historyLog, setHistoryLog] = useState([])

  useEffect(() => {
    if (!prediction) return

    const entry = {
      time: new Date().toLocaleTimeString(),
      row: currentIndex,
      status: prediction.prediction,
      confidence: prediction.confidence
    }

    setHistoryLog((prev) => {
      const updated = [entry, ...prev] // newest on top
      return updated.slice(0, MAX_HISTORY_ROWS)
    })
  }, [prediction])

  return historyLog
}