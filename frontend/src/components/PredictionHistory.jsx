function PredictionHistory({ historyLog }) {
  return (
    <div className="history-card">
      <p className="analysis-title">Prediction History</p>
      <table className="history-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Row</th>
            <th>Status</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {historyLog.map((entry, i) => (
            <tr key={i} className={entry.status === 'Fault' ? 'row-fault' : 'row-normal'}>
              <td>{entry.time}</td>
              <td>{entry.row}</td>
              <td>{entry.status === 'Fault' ? '🔴 Fault' : '🟢 Normal'}</td>
              <td>{entry.confidence}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PredictionHistory