function SensorCard({ label, value, unit, status }) {
  const statusColor = {
    normal: '🟢',
    warning: '🟡',
    critical: '🔴'
  }

  return (
    <div className="sensor-card">
      <p className="sensor-label">{label}</p>
      <p className="sensor-value">{value} {unit}</p>
      <p className="sensor-status">{statusColor[status] || '🟢'} {status}</p>
    </div>
  )
}

export default SensorCard