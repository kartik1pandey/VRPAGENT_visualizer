import { useState } from 'react'
import './AlgorithmComparison.css'

function AlgorithmComparison({ onCompare }) {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([])
  const [comparisonResults, setComparisonResults] = useState(null)

  const toggleAlgorithm = (algoId) => {
    setSelectedAlgorithms(prev => {
      if (prev.includes(algoId)) {
        return prev.filter(id => id !== algoId)
      } else if (prev.length < 3) {
        return [...prev, algoId]
      }
      return prev
    })
  }

  const runComparison = async () => {
    if (selectedAlgorithms.length < 2) return
    
    const results = await onCompare(selectedAlgorithms)
    setComparisonResults(results)
  }

  return (
    <div className="algorithm-comparison">
      <h2>Compare Algorithms</h2>
      <p className="comparison-hint">Select 2-3 algorithms to compare</p>
      
      <div className="selected-count">
        Selected: {selectedAlgorithms.length}/3
      </div>

      {selectedAlgorithms.length >= 2 && (
        <button className="compare-button" onClick={runComparison}>
          📊 Compare Selected
        </button>
      )}

      {comparisonResults && (
        <div className="comparison-results">
          <h3>Comparison Results</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Time (ms)</th>
                <th>Distance</th>
                <th>Routes</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map((result, idx) => (
                <tr key={idx} className={result.isBest ? 'best-result' : ''}>
                  <td>{result.name}</td>
                  <td>{result.time}</td>
                  <td>{result.distance}</td>
                  <td>{result.routes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AlgorithmComparison
