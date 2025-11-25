import { useEffect, useRef } from 'react'
import './VRPVisualizer.css'

const COLORS = [
  '#667eea', '#f56565', '#48bb78', '#ed8936', '#9f7aea',
  '#38b2ac', '#ed64a6', '#ecc94b', '#4299e1', '#fc8181'
]

function VRPVisualizer({ solution }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!solution || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, width, height)

    // Define depot position
    const depotX = width / 2
    const depotY = height / 2
    
    // Draw depot
    ctx.fillStyle = '#fbbf24'
    ctx.beginPath()
    ctx.arc(depotX, depotY, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw routes
    solution.routes.forEach((route, routeIndex) => {
      const color = COLORS[routeIndex % COLORS.length]
      
      // Draw route lines
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(depotX, depotY)
      
      route.customers.forEach(customer => {
        ctx.lineTo(customer.x, customer.y)
      })
      
      ctx.lineTo(depotX, depotY)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw customers
      route.customers.forEach((customer, idx) => {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(customer.x, customer.y, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw customer ID
        ctx.fillStyle = '#fff'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(customer.id.toString(), customer.x, customer.y - 12)
      })
    })

    // Draw legend
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(10, 10, 150, solution.routes.length * 25 + 20)
    
    solution.routes.forEach((route, idx) => {
      const y = 30 + idx * 25
      ctx.fillStyle = COLORS[idx % COLORS.length]
      ctx.fillRect(20, y - 8, 15, 15)
      ctx.fillStyle = '#f1f5f9'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(`Route ${idx + 1} (${route.customers.length})`, 45, y + 4)
    })

  }, [solution])

  return (
    <div className="vrp-visualizer">
      <h2>Route Visualization</h2>
      {!solution ? (
        <div className="empty-state">
          <div className="empty-icon">🗺️</div>
          <p>Select an algorithm and click "Run" to visualize routes</p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          className="visualization-canvas"
        />
      )}
    </div>
  )
}

export default VRPVisualizer
