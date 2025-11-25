import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-text">Computing optimal routes...</div>
    </div>
  )
}

export default LoadingSpinner
