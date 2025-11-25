import './ParameterPanel.css'

function ParameterPanel({ parameters, setParameters }) {
  const handleChange = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: parseInt(value)
    }))
  }

  return (
    <div className="parameter-panel">
      <h2>Problem Parameters</h2>
      
      <div className="parameter-group">
        <label>
          <span className="param-label">Number of Customers</span>
          <input
            type="range"
            min="10"
            max="100"
            value={parameters.numCustomers}
            onChange={(e) => handleChange('numCustomers', e.target.value)}
          />
          <span className="param-value">{parameters.numCustomers}</span>
        </label>
      </div>

      <div className="parameter-group">
        <label>
          <span className="param-label">Vehicle Capacity</span>
          <input
            type="range"
            min="50"
            max="200"
            value={parameters.vehicleCapacity}
            onChange={(e) => handleChange('vehicleCapacity', e.target.value)}
          />
          <span className="param-value">{parameters.vehicleCapacity}</span>
        </label>
      </div>

      <div className="parameter-group">
        <label>
          <span className="param-label">Number of Vehicles</span>
          <input
            type="range"
            min="2"
            max="10"
            value={parameters.numVehicles}
            onChange={(e) => handleChange('numVehicles', e.target.value)}
          />
          <span className="param-value">{parameters.numVehicles}</span>
        </label>
      </div>
    </div>
  )
}

export default ParameterPanel
