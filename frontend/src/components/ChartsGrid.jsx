import LiveChart from './LiveChart'

function ChartsGrid({ history }) {
  return (
    <div className="charts-grid">
      <LiveChart data={history} dataKey="pressure" label="Pressure" unit="psi" color="#00d4ff" />
      <LiveChart data={history} dataKey="temperature" label="Temperature" unit="°C" color="#ff6b6b" />
      <LiveChart data={history} dataKey="flow_rate" label="Flow Rate" unit="m³/s" color="#51cf66" />
      <LiveChart data={history} dataKey="energy_consumption" label="Energy Consumption" unit="kW" color="#ffd43b" />
    </div>
  )
}

export default ChartsGrid