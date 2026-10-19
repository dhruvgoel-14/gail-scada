import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import DataAnalysis from './pages/DataAnalysis'
import History from './pages/History'
import { SimulationProvider } from './context/SimulationContext'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <SimulationProvider>
      <div>
        <Navbar />
        <nav className="page-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🏠 Dashboard</Link>
          <Link to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>🤖 Analytics</Link>
          <Link to="/data-analysis" className={location.pathname === '/data-analysis' ? 'active' : ''}>📂 Data Analysis</Link>
          <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>📜 History</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </SimulationProvider>
  )
}

export default App