import { useState, useMemo } from 'react'
import { useSimulationContext } from '../context/SimulationContext'

function History() {
  const { historyLog } = useSimulationContext()
  const [filter, setFilter] = useState('all')

  const filteredLog = useMemo(() => {
    if (filter === 'all') return historyLog
    return historyLog.filter((entry) =>
      filter === 'fault' ? entry.status === 'Fault' : entry.status === 'Normal'
    )
  }, [historyLog, filter])

  const faultCount = historyLog.filter((e) => e.status === 'Fault').length
  const normalCount = historyLog.length - faultCount
  const faultRate = historyLog.length > 0
    ? ((faultCount / historyLog.length) * 100).toFixed(1)
    : 0

  const downloadReport = () => {
    const headers = 'time,row,status,confidence\n'
    const rows = historyLog
      .map((e) => `${e.time},${e.row},${e.status},${e.confidence}`)
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prediction_history_report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className="metrics-grid">
        <div className="metric-card">
          <p className="detail-label">Total Logged</p>
          <p className="detail-value">{historyLog.length}</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Faults</p>
          <p className="detail-value" style={{ color: '#f85149' }}>{faultCount}</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Normal</p>
          <p className="detail-value" style={{ color: '#3fb950' }}>{normalCount}</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Fault Rate</p>
          <p className="detail-value">{faultRate}%</p>
        </div>
      </div>

      <div className="analysis-card" style={{ marginTop: '24px' }}>
        <div className="upload-row" style={{ justifyContent: 'space-between' }}>
          <p className="analysis-title" style={{ marginBottom: 0 }}>Prediction Timeline</p>
          <div className="upload-row">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="ctrl-btn"
              style={{ cursor: 'pointer' }}
            >
              <option value="all">All</option>
              <option value="fault">Faults Only</option>
              <option value="normal">Normal Only</option>
            </select>
            <button className="ctrl-btn reset" onClick={downloadReport}>⬇ Export Report</button>
          </div>
        </div>

        <table className="history-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Row</th>
              <th>Status</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {filteredLog.length === 0 ? (
              <tr><td colSpan="4">No entries yet — visit the Dashboard to start logging.</td></tr>
            ) : (
              filteredLog.map((entry, i) => (
                <tr key={i} className={entry.status === 'Fault' ? 'row-fault' : 'row-normal'}>
                  <td>{entry.time}</td>
                  <td>{entry.row}</td>
                  <td>{entry.status === 'Fault' ? '🔴 Fault' : '🟢 Normal'}</td>
                  <td>{entry.confidence}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History