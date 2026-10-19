function SimulationControls({ isRunning, pause, resume, reset, currentIndex, totalRows }) {
  return (
    <div className="controls-bar">
      <div className="controls-buttons">
        {isRunning ? (
          <button className="ctrl-btn pause" onClick={pause}>⏸ Pause</button>
        ) : (
          <button className="ctrl-btn play" onClick={resume}>▶ Start</button>
        )}
        <button className="ctrl-btn reset" onClick={reset}>🔄 Reset</button>
      </div>
      <p className="controls-status">
        Row {currentIndex + 1} of {totalRows} {isRunning ? '— Live' : '— Paused'}
      </p>
    </div>
  )
}

export default SimulationControls