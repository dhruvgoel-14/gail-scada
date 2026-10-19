export function getPressureStatus(value) {
  // mean 76.2, std 9.48, range 43-115
  if (value > 95 || value < 55) return 'critical'
  if (value > 85 || value < 65) return 'warning'
  return 'normal'
}

export function getTemperatureStatus(value) {
  // mean 32.1, std 1.98, range 25.9-38.5
  if (value > 36 || value < 28) return 'critical'
  if (value > 34 || value < 29.5) return 'warning'
  return 'normal'
}

export function getFlowRateStatus(value) {
  // mean 4.36, std 0.89, range 1.01-7.53
  if (value < 2.5 || value > 6.5) return 'critical'
  if (value < 3.3 || value > 5.8) return 'warning'
  return 'normal'
}

export function getEnergyStatus(value) {
  // mean 26.85, std 9.27, range 5.42-58.18
  if (value > 45) return 'critical'
  if (value > 36) return 'warning'
  return 'normal'
}

export function getPumpSpeedStatus(value) {
  // bimodal: 0 when off, ~1300-1420 typical when running, max 1678.8
  if (value === 0) return 'warning' // pump off — worth flagging visually
  if (value > 1550) return 'critical'
  return 'normal'
}