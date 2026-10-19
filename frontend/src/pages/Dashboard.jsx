import SensorGrid from '../components/SensorGrid'
import ChartsGrid from '../components/ChartsGrid'
import PredictionPanel from '../components/PredictionPanel'
import FaultAnalysis from '../components/FaultAnalysis'
import PredictionHistory from '../components/PredictionHistory'
import SimulationControls from '../components/SimulationControls'
import { useSimulationContext } from '../context/SimulationContext'

function Dashboard() {
  const {
    currentRow, currentIndex, totalRows, history,
    isRunning, pause, resume, reset,
    prediction, loading, error, historyLog
  } = useSimulationContext()

  return (
    <div style={{ padding: '20px' }}>
      <SimulationControls
        isRunning={isRunning}
        pause={pause}
        resume={resume}
        reset={reset}
        currentIndex={currentIndex}
        totalRows={totalRows}
      />
      <SensorGrid currentRow={currentRow} />
      <ChartsGrid history={history} />
      <PredictionPanel prediction={prediction} loading={loading} error={error} />
      <FaultAnalysis currentRow={currentRow} isFault={prediction?.prediction === 'Fault'} />
      <PredictionHistory historyLog={historyLog} />
    </div>
  )
}

export default Dashboard    