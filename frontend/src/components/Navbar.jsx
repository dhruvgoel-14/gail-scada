import { useState, useEffect } from 'react'

function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">GAIL</span>
        <span className="navbar-title">SCADA Pipeline Fault Prediction</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-status">🟢 Connected</span>
        <span className="navbar-time">
          {currentTime.toLocaleTimeString()}
        </span>
      </div>
    </nav>
  )
}

export default Navbar