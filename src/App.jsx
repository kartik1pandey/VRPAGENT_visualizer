import { useState } from 'react'
import AlgorithmSelector from './components/AlgorithmSelector'
import VRPVisualizer from './components/VRPVisualizer'
import PerformanceMetrics from './components/PerformanceMetrics'
import ParameterPanel from './components/ParameterPanel'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [vrpType, setVrpType] = useState('cvrp')
  const [solution, setSolution] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [parameters, setParameters] = useState({
    numCustomers: 50,
    vehicleCapacity: 100,
    numVehicles: 5
  })

  const runAlgorithm = async () => {
    if (!selectedAlgorithm) return
    
    setIsRunning(true)
    
    try {
      // Call backend API
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${API_URL}/api/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vrpType,
          algorithmId: selectedAlgorithm.id,
          parameters
        })
      })

      if (!response.ok) {
        throw new Error('Failed to solve VRP problem')
      }

      const data = await response.json()
      
      setSolution(data.solution)
      setMetrics({
        executionTime: data.metrics.executionTime.toFixed(2),
        totalDistance: data.metrics.totalDistance.toFixed(2),
        numRoutes: data.metrics.numRoutes,
        avgRouteLength: data.metrics.avgRouteLength.toFixed(2),
        customersServed: data.metrics.customersServed
      })
    } catch (error) {
      console.error('Error running algorithm:', error)
      alert('Failed to run algorithm. Make sure the backend server is running on port 3001.')
      
      // Fallback to mock solution
      const mockSolution = generateMockSolution(parameters)
      setSolution(mockSolution)
      setMetrics({
        executionTime: '0',
        totalDistance: mockSolution.totalDistance.toFixed(2),
        numRoutes: mockSolution.routes.length,
        avgRouteLength: (mockSolution.totalDistance / mockSolution.routes.length).toFixed(2),
        customersServed: mockSolution.routes.reduce((sum, r) => sum + r.customers.length, 0)
      })
    } finally {
      setIsRunning(false)
    }
  }

  const generateMockSolution = (params) => {
    const routes = []
    const numRoutes = params.numVehicles
    const customersPerRoute = Math.floor(params.numCustomers / numRoutes)
    
    let totalDistance = 0
    
    for (let i = 0; i < numRoutes; i++) {
      const route = {
        id: i,
        customers: [],
        load: 0,
        distance: 0
      }
      
      for (let j = 0; j < customersPerRoute; j++) {
        const customer = {
          id: i * customersPerRoute + j + 1,
          x: Math.random() * 800 + 100,
          y: Math.random() * 500 + 50,
          demand: Math.floor(Math.random() * 20) + 5
        }
        route.customers.push(customer)
        route.load += customer.demand
      }
      
      route.distance = calculateRouteDistance(route.customers)
      totalDistance += route.distance
      routes.push(route)
    }
    
    return { routes, totalDistance }
  }

  const calculateRouteDistance = (customers) => {
    let distance = 0
    for (let i = 0; i < customers.length - 1; i++) {
      const dx = customers[i + 1].x - customers[i].x
      const dy = customers[i + 1].y - customers[i].y
      distance += Math.sqrt(dx * dx + dy * dy)
    }
    return distance
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚚 VRPAgent Visualizer</h1>
        <p>Interactive visualization of AI-generated Vehicle Routing Problem heuristics</p>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <AlgorithmSelector
            vrpType={vrpType}
            setVrpType={setVrpType}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
          
          <ParameterPanel
            parameters={parameters}
            setParameters={setParameters}
          />
          
          <button 
            className="run-button"
            onClick={runAlgorithm}
            disabled={!selectedAlgorithm || isRunning}
          >
            <span>{isRunning ? '⏳ Running...' : '▶️ Run Algorithm'}</span>
          </button>
          
          {metrics && <PerformanceMetrics metrics={metrics} />}
        </div>

        <div className="right-panel">
          {isRunning ? <LoadingSpinner /> : <VRPVisualizer solution={solution} />}
        </div>
      </div>

      <footer className="app-footer">
        <p>
          <a href="https://arxiv.org/abs/2510.07073" target="_blank" rel="noopener noreferrer">
            📄 Research Paper
          </a>
          {' • '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            💻 GitHub
          </a>
          {' • '}
          Built with AI-Generated Algorithms
        </p>
      </footer>
    </div>
  )
}

export default App
