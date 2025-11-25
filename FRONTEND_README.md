# VRPAgent Frontend Visualizer

An interactive web application to visualize and compare the AI-generated Vehicle Routing Problem heuristics from VRPAgent.

## Features

✨ **Interactive Visualization**
- Real-time route visualization on canvas
- Color-coded routes for easy distinction
- Depot and customer location display

📊 **Performance Metrics**
- Execution time tracking
- Total distance calculation
- Route statistics
- Customer coverage metrics

🎛️ **Adjustable Parameters**
- Number of customers (10-100)
- Vehicle capacity (50-200)
- Number of vehicles (2-10)

🔬 **Algorithm Comparison**
- Compare different optimized heuristics
- View performance scores
- Switch between CVRP, PCVRP, and VRPTW variants

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## How to Use

1. **Select Problem Type**: Choose between CVRP, PCVRP, or VRPTW
2. **Select Algorithm**: Pick one of the optimized heuristics (lower score = better)
3. **Adjust Parameters**: Use sliders to set problem parameters
4. **Run Algorithm**: Click the "Run Algorithm" button
5. **View Results**: See the visualization and performance metrics

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AlgorithmSelector.jsx    # Algorithm selection UI
│   │   ├── VRPVisualizer.jsx        # Canvas-based route visualization
│   │   ├── PerformanceMetrics.jsx   # Metrics display
│   │   └── ParameterPanel.jsx       # Parameter controls
│   ├── App.jsx                      # Main application
│   └── main.jsx                     # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Next Steps: Integrating Real C++ Algorithms

Currently, the frontend uses mock data. To integrate the actual C++ heuristics:

### Option 1: WebAssembly (Recommended)

1. Install Emscripten:
```bash
# Follow instructions at https://emscripten.org/docs/getting_started/downloads.html
```

2. Compile C++ to WebAssembly:
```bash
emcc generated_heuristics/cvrp/optimized_heuristics/best_solution_36.3972.cpp \
  -o src/wasm/vrp_solver.js \
  -s EXPORTED_FUNCTIONS='["_select_by_llm_1", "_sort_by_llm_1"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
```

3. Import in React:
```javascript
import Module from './wasm/vrp_solver.js'

const selectCustomers = Module.cwrap('select_by_llm_1', 'array', ['object'])
```

### Option 2: Node.js Backend API

1. Create a backend server:
```bash
mkdir backend
cd backend
npm init -y
npm install express node-gyp
```

2. Create C++ Node.js addon using node-gyp
3. Expose REST API endpoints
4. Call from frontend using fetch/axios

### Option 3: Rewrite in JavaScript

Port the C++ algorithms to JavaScript/TypeScript for direct browser execution.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Canvas API** - Route visualization
- **CSS3** - Styling and animations

## Performance Notes

- The current implementation uses simulated algorithm execution
- Real C++ integration will provide actual heuristic performance
- Canvas rendering is optimized for up to 100 customers
- For larger instances, consider using WebGL or SVG

## Contributing

To add new features:
1. Add new algorithm variants in `AlgorithmSelector.jsx`
2. Extend visualization in `VRPVisualizer.jsx`
3. Add new metrics in `PerformanceMetrics.jsx`

## License

This frontend is provided as a demonstration tool for the VRPAgent research project.
