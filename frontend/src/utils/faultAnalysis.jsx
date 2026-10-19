export function analyzeFault(row) {
  const reasons = []

  if (row.pressure > 95) reasons.push({ factor: 'Pressure', detail: `${row.pressure} psi — above safe limit`, direction: 'high' })
  if (row.pressure < 55) reasons.push({ factor: 'Pressure', detail: `${row.pressure} psi — below safe limit`, direction: 'low' })

  if (row.flow_rate < 2.5) reasons.push({ factor: 'Flow Rate', detail: `${row.flow_rate} m³/s — critically low`, direction: 'low' })

  if (row.temperature > 36) reasons.push({ factor: 'Temperature', detail: `${row.temperature}°C — above safe limit`, direction: 'high' })

  if (row.energy_consumption > 45) reasons.push({ factor: 'Energy Consumption', detail: `${row.energy_consumption} kW — abnormally high`, direction: 'high' })

  if (row.pump_speed === 0) reasons.push({ factor: 'Pump Speed', detail: 'Pump appears to be OFF', direction: 'off' })
  if (row.pump_speed > 1550) reasons.push({ factor: 'Pump Speed', detail: `${row.pump_speed} RPM — running too fast`, direction: 'high' })

  if (row.valve_status === 0) reasons.push({ factor: 'Valve', detail: 'Valve is CLOSED', direction: 'closed' })

  if (row.compressor_state === 0) reasons.push({ factor: 'Compressor', detail: 'Compressor is OFF', direction: 'off' })

  return reasons
}

export function getRecommendations(reasons) {
  const actions = new Set()

  reasons.forEach((r) => {
    if (r.factor === 'Pressure') actions.add('Inspect pipeline segment for blockage or leakage')
    if (r.factor === 'Flow Rate') actions.add('Check for obstruction or valve malfunction')
    if (r.factor === 'Temperature') actions.add('Inspect cooling system and check for overheating')
    if (r.factor === 'Energy Consumption') actions.add('Check compressor and pump load levels')
    if (r.factor === 'Pump Speed') actions.add('Inspect pump motor and control settings')
    if (r.factor === 'Valve') actions.add('Verify valve position and actuator function')
    if (r.factor === 'Compressor') actions.add('Check compressor power supply and controls')
  })

  if (actions.size === 0) actions.add('Continue routine monitoring — no immediate action needed')

  return Array.from(actions)
}