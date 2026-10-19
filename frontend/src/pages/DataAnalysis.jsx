import { useState } from 'react'
import { predictCSV } from '../api/api'

function DataAnalysis() {
  const [file, setFile] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResults(null)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const data = await predictCSV(file)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadResults = () => {
    if (!results) return
    const headers = 'row,prediction,fault_probability\n'
    const rows = results.results
      .map((r) => `${r.row},${r.prediction},${r.fault_probability}`)
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prediction_results.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className="analysis-card">
        <p className="analysis-title">Upload Pipeline Dataset (CSV)</p>
        <div className="upload-row">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button className="ctrl-btn play" onClick={handleUpload} disabled={!file || loading}>
            {loading ? 'Processing...' : 'Upload & Predict'}
          </button>
        </div>
        {error && <p style={{ color: '#f85149', marginTop: '12px' }}>⚠ {error}</p>}
      </div>

      {results && (
        <>
          <div className="metrics-grid" style={{ marginTop: '24px' }}>
            <div className="metric-card">
              <p className="detail-label">Total Samples</p>
              <p className="detail-value">{results.total_samples}</p>
            </div>
            <div className="metric-card">
              <p className="detail-label">Faults Detected</p>
              <p className="detail-value" style={{ color: '#f85149' }}>{results.faults}</p>
            </div>
            <div className="metric-card">
              <p className="detail-label">Normal</p>
              <p className="detail-value" style={{ color: '#3fb950' }}>{results.normal}</p>
            </div>
          </div>

          <div className="analysis-card" style={{ marginTop: '24px' }}>
            <div className="upload-row" style={{ justifyContent: 'space-between' }}>
              <p className="analysis-title" style={{ marginBottom: 0 }}>Batch Prediction Results</p>
              <button className="ctrl-btn reset" onClick={downloadResults}>⬇ Download CSV</button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginTop: '12px' }}>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Prediction</th>
                    <th>Fault Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {results.results.map((r) => (
                    <tr key={r.row} className={r.prediction === 'Fault' ? 'row-fault' : 'row-normal'}>
                      <td>{r.row}</td>
                      <td>{r.prediction === 'Fault' ? '🔴 Fault' : '🟢 Normal'}</td>
                      <td>{r.fault_probability}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DataAnalysis