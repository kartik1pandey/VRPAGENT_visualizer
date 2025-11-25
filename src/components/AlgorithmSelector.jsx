import { useState, useEffect } from 'react'
import './AlgorithmSelector.css'

const algorithms = {
  cvrp: [
    { id: 'cvrp_36.3972', name: 'Best Solution 36.3972', score: 36.3972 },
    { id: 'cvrp_36.3980', name: 'Best Solution 36.3980', score: 36.3980 },
    { id: 'cvrp_36.4030', name: 'Best Solution 36.4030', score: 36.4030 },
    { id: 'cvrp_36.4060', name: 'Best Solution 36.4060', score: 36.4060 },
    { id: 'cvrp_36.4121', name: 'Best Solution 36.4121', score: 36.4121 }
  ],
  pcvrp: [
    { id: 'pcvrp_43.2732', name: 'Best Solution 43.2732', score: 43.2732 },
    { id: 'pcvrp_43.2786', name: 'Best Solution 43.2786', score: 43.2786 },
    { id: 'pcvrp_43.2794', name: 'Best Solution 43.2794', score: 43.2794 },
    { id: 'pcvrp_43.2953', name: 'Best Solution 43.2953', score: 43.2953 },
    { id: 'pcvrp_43.3193', name: 'Best Solution 43.3193', score: 43.3193 }
  ],
  vrptw: [
    { id: 'vrptw_48.1163', name: 'Best Solution 48.1163', score: 48.1163 },
    { id: 'vrptw_48.1390', name: 'Best Solution 48.1390', score: 48.1390 },
    { id: 'vrptw_48.1401', name: 'Best Solution 48.1401', score: 48.1401 },
    { id: 'vrptw_48.1455', name: 'Best Solution 48.1455', score: 48.1455 },
    { id: 'vrptw_48.1539', name: 'Best Solution 48.1539', score: 48.1539 }
  ]
}

const vrpTypeInfo = {
  cvrp: {
    name: 'CVRP',
    fullName: 'Capacitated Vehicle Routing Problem',
    description: 'Vehicles have capacity constraints'
  },
  pcvrp: {
    name: 'PCVRP',
    fullName: 'Prize-Collecting VRP',
    description: 'Customers have prizes, maximize collection'
  },
  vrptw: {
    name: 'VRPTW',
    fullName: 'VRP with Time Windows',
    description: 'Customers must be visited within time windows'
  }
}

function AlgorithmSelector({ vrpType, setVrpType, selectedAlgorithm, setSelectedAlgorithm }) {
  const currentAlgorithms = algorithms[vrpType]

  return (
    <div className="algorithm-selector">
      <h2>Select Problem Type</h2>
      <div className="vrp-type-selector">
        {Object.keys(vrpTypeInfo).map(type => (
          <button
            key={type}
            className={`vrp-type-btn ${vrpType === type ? 'active' : ''}`}
            onClick={() => {
              setVrpType(type)
              setSelectedAlgorithm(null)
            }}
          >
            <div className="vrp-type-name">{vrpTypeInfo[type].name}</div>
            <div className="vrp-type-desc">{vrpTypeInfo[type].description}</div>
          </button>
        ))}
      </div>

      <h2>Select Algorithm</h2>
      <div className="algorithm-list">
        {currentAlgorithms.map(algo => (
          <div
            key={algo.id}
            className={`algorithm-item ${selectedAlgorithm?.id === algo.id ? 'selected' : ''}`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            <div className="algo-name">{algo.name}</div>
            <div className="algo-score">Score: {algo.score}</div>
            <div className="algo-badge">
              {algo.score === Math.min(...currentAlgorithms.map(a => a.score)) && '🏆 Best'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlgorithmSelector
