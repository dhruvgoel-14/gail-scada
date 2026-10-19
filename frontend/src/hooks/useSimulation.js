import { useState, useEffect, useRef } from 'react'
import Papa from 'papaparse'

const MAX_HISTORY = 20 // how many points to show on the chart at once

export function useSimulation(intervalMs = 2000) {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentRow, setCurrentRow] = useState(null)
  const [history, setHistory] = useState([])
  const [isRunning, setIsRunning] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    fetch('/sample_data.csv')
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        })
        setData(parsed.data)
        setCurrentRow(parsed.data[0])
        setHistory([{ ...parsed.data[0], time: 0 }])
      })
  }, [])

  useEffect(() => {
    if (!isRunning || data.length === 0) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length
        const nextRow = data[nextIndex]
        setCurrentRow(nextRow)

        setHistory((prevHistory) => {
          const updated = [...prevHistory, { ...nextRow, time: nextIndex }]
          return updated.slice(-MAX_HISTORY) // keep only the last N points
        })

        return nextIndex
      })
    }, intervalMs)

    return () => clearInterval(intervalRef.current)
  }, [isRunning, data, intervalMs])

  const pause = () => setIsRunning(false)
  const resume = () => setIsRunning(true)
  const reset = () => {
    setCurrentIndex(0)
    setCurrentRow(data[0])
    setHistory([{ ...data[0], time: 0 }])
  }

  return { currentRow, currentIndex, totalRows: data.length, history, isRunning, pause, resume, reset }
}