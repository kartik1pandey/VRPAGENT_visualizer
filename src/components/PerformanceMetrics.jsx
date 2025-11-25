import './PerformanceMetrics.css'

function PerformanceMetrics({ metrics }) {
  if (!metrics) return null

  const metricItems = [
    { label: 'Execution Time', value: `${metrics.executionTime} ms`, icon: '⏱️' },
    { label: 'Total Distance', value: metrics.totalDistance, icon: '📏' },
    { label: 'Number of Routes', value: metrics.numRoutes, icon: '🚛' },
    { label: 'Avg Route Length', value: metrics.avgRouteLength, icon: '📊' },
    { label: 'Customers Served', value: metrics.customersServed, icon: '👥' }
  ]

  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
      <div className="metrics-grid">
        {metricItems.map((item, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">{item.icon}</div>
            <div className="metric-content">
              <div className="metric-label">{item.label}</div>
              <div className="metric-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerformanceMetrics
