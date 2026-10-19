import SensorCard from './SensorCard'

import { getPressureStatus, getTemperatureStatus, getFlowRateStatus, getEnergyStatus, getPumpSpeedStatus } from '../utils/statusLogic'

function SensorGrid({ currentRow }) {
  if (!currentRow) return <p>Loading sensor data...</p>

  return (
    <div className="sensor-grid">
      <SensorCard
        label="Pressure"
        value={currentRow.pressure}
        unit="psi"
        status={getPressureStatus(currentRow.pressure)}
      />
      <SensorCard
        label="Temperature"
        value={currentRow.temperature}
        unit="°C"
        status={getTemperatureStatus(currentRow.temperature)}
      />
      <SensorCard
        label="Flow Rate"
        value={currentRow.flow_rate}
        unit="m³/s"
        status={getFlowRateStatus(currentRow.flow_rate)}
      />
      <SensorCard
        label="Pump Speed"
        value={currentRow.pump_speed}
        unit="RPM"
        status="normal"
      />
      <SensorCard
        label="Energy"
        value={currentRow.energy_consumption}
        unit="kWh"
        status={getEnergyStatus(currentRow.energy_consumption)}
      />
      <SensorCard
        label="Energy Consumption"
        value={currentRow.energy_consumption}
        unit="kW"
        status={getEnergyStatus(currentRow.energy_consumption)}
     />
     <SensorCard
        label="Pump Speed"
        value={currentRow.pump_speed}
        unit="RPM"
        status={getPumpSpeedStatus(currentRow.pump_speed)}
/>
    </div>
  )
}

export default SensorGrid