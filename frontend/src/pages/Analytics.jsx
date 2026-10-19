import { useState, useEffect } from 'react'
import { getMetrics, getFeatureImportance } from '../api/api'

function Analytics() {
  const [metrics, setMetrics] = useState(null)
  const [featureImportance, setFeatureImportance] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch((err) => setError(err.message))

    getFeatureImportance()
      .then(setFeatureImportance)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <p style={{ padding: '20px', color: 'red' }}>Error: {error}</p>
  if (!metrics || !featureImportance) return <p style={{ padding: '20px' }}>Loading analytics...</p>

  const maxImportance = Math.max(...Object.values(featureImportance))

  return (
    <div style={{ padding: '20px' }}>
      <div className="metrics-grid">
        <div className="metric-card">
          <p className="detail-label">Accuracy</p>
          <p className="detail-value">{metrics.accuracy}%</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Precision</p>
          <p className="detail-value">{metrics.precision}%</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Recall</p>
          <p className="detail-value">{metrics.recall}%</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">F1 Score</p>
          <p className="detail-value">{metrics.f1_score}%</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Model</p>
          <p className="detail-value" style={{ fontSize: '16px' }}>{metrics.model}</p>
        </div>
        <div className="metric-card">
          <p className="detail-label">Train / Test Samples</p>
          <p className="detail-value" style={{ fontSize: '16px' }}>{metrics.train_samples} / {metrics.test_samples}</p>
        </div>
      </div>

      <div className="analysis-card" style={{ marginTop: '24px' }}>
        <p className="analysis-title">Feature Importance</p>
        {Object.entries(featureImportance).map(([name, value]) => (
          <div key={name} className="importance-row">
            <span className="importance-label">{name}</span>
            <div className="importance-bar-track">
              <div
                className="importance-bar-fill"
                style={{ width: `${(value / maxImportance) * 100}%` }}
              />
            </div>
            <span className="importance-value">{value}%</span>
          </div>
        ))}
      </div>

      <div className="analysis-card" style={{ marginTop: '24px' }}>
        <p className="analysis-title">Confusion Matrix</p>
        <table className="history-table">
          <thead>
            <tr>
              <th></th>
              <th>Predicted Normal</th>
              <th>Predicted Fault</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Actual Normal</strong></td>
              <td>{metrics.confusion_matrix[0][0]}</td>
              <td>{metrics.confusion_matrix[0][1]}</td>
            </tr>
            <tr>
              <td><strong>Actual Fault</strong></td>
              <td>{metrics.confusion_matrix[1][0]}</td>
              <td>{metrics.confusion_matrix[1][1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Analytics