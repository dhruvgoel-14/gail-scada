import { analyzeFault, getRecommendations } from '../utils/faultAnalysis'

function FaultAnalysis({ currentRow, isFault }) {
  if (!currentRow) return null

  const reasons = analyzeFault(currentRow)
  const recommendations = getRecommendations(reasons)

  return (
    <div className="analysis-grid">
      <div className="analysis-card">
        <p className="analysis-title">Why This Prediction?</p>
        {reasons.length === 0 ? (
          <p className="analysis-empty">All readings within normal range.</p>
        ) : (
          <ul className="reason-list">
            {reasons.map((r, i) => (
              <li key={i}>
                <strong>{r.factor}:</strong> {r.detail}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="analysis-card">
        <p className="analysis-title">Recommended Actions</p>
        <ul className="recommendation-list">
          {recommendations.map((action, i) => (
            <li key={i}>✔ {action}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FaultAnalysis