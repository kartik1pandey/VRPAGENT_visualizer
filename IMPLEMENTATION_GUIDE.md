# VRPAgent Frontend Implementation Guide

## 🎯 Overview

This guide explains how the frontend works and how to integrate the actual C++ algorithms.

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Algorithm   │  │  Parameter   │  │     VRP      │  │
│  │   Selector   │  │    Panel     │  │  Visualizer  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Performance Metrics Display              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Algorithm Engine    │
              │  (Currently Mocked)   │
              └───────────────────────┘
```

## 🔧 Current Implementation

### Mock Algorithm Execution

The current implementation simulates algorithm execution:

```javascript
// In App.jsx
const runAlgorithm = async () => {
  const startTime = performance.now()
  
  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const endTime = performance.now()
  
  // Generate mock solution
  const mockSolution = generateMockSolution(parameters)
  
  // Calculate metrics
  setMetrics({
    executionTime: (endTime - startTime).toFixed(2),
    totalDistance: mockSolution.totalDistance.toFixed(2),
    // ... other metrics
  })
}
```

### Data Structures

```javascript
// Solution structure
{
  routes: [
    {
      id: 0,
      customers: [
        { id: 1, x: 150, y: 200, demand: 15 },
        { id: 2, x: 300, y: 150, demand: 10 }
      ],
      load: 25,
      distance: 234.5
    }
  ],
  totalDistance: 1234.5
}
```

## 🚀 Integration Options

### Option 1: WebAssembly Integration (Recommended)

**Pros:**
- Native C++ performance in browser
- No server required
- Direct algorithm execution

**Cons:**
- Requires Emscripten setup
- More complex build process
- Larger bundle size

#### Implementation Steps:

1. **Install Emscripten:**
```bash
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

2. **Create C++ Wrapper:**
```cpp
// vrp_wrapper.cpp
#include <emscripten/bind.h>
#include "AgentDesigned.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(vrp_module) {
    function("selectCustomers", &select_by_llm_1);
    function("sortCustomers", &sort_by_llm_1);
}
```

3. **Compile to WASM:**
```bash
emcc vrp_wrapper.cpp \
  generated_heuristics/cvrp/optimized_heuristics/best_solution_36.3972.cpp \
  -o src/wasm/vrp.js \
  -s WASM=1 \
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
  --bind
```

4. **Use in React:**
```javascript
import Module from './wasm/vrp.js'

const runAlgorithm = async () => {
  const wasmModule = await Module()
  const result = wasmModule.selectCustomers(solutionData)
  // Process result...
}
```

---

### Option 2: Node.js Backend API

**Pros:**
- Easier to debug
- Can use existing C++ code with minimal changes
- Better for complex operations

**Cons:**
- Requires server deployment
- Network latency
- More infrastructure

#### Implementation Steps:

1. **Create Backend:**
```bash
mkdir backend
cd backend
npm init -y
npm install express cors node-gyp
```

2. **Create binding.gyp:**
```json
{
  "targets": [
    {
      "target_name": "vrp_solver",
      "sources": [
        "src/vrp_addon.cpp",
        "../generated_heuristics/cvrp/optimized_heuristics/best_solution_36.3972.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ]
    }
  ]
}
```

3. **Create Node.js Addon:**
```cpp
// src/vrp_addon.cpp
#include <napi.h>
#include "AgentDesigned.h"

Napi::Array SelectCustomers(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  // Convert JS objects to C++ structures
  // Call select_by_llm_1
  // Convert result back to JS array
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("selectCustomers", Napi::Function::New(env, SelectCustomers));
  return exports;
}

NODE_API_MODULE(vrp_solver, Init)
```

4. **Create Express Server:**
```javascript
// server.js
const express = require('express')
const cors = require('cors')
const vrpSolver = require('./build/Release/vrp_solver')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/solve', (req, res) => {
  const { algorithm, parameters, solution } = req.body
  
  const startTime = Date.now()
  const result = vrpSolver.selectCustomers(solution)
  const endTime = Date.now()
  
  res.json({
    result,
    executionTime: endTime - startTime
  })
})

app.listen(3001, () => {
  console.log('VRP Solver API running on port 3001')
})
```

5. **Update Frontend:**
```javascript
// In App.jsx
const runAlgorithm = async () => {
  const response = await fetch('http://localhost:3001/api/solve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      algorithm: selectedAlgorithm.id,
      parameters,
      solution: currentSolution
    })
  })
  
  const data = await response.json()
  setSolution(data.result)
  setMetrics({ executionTime: data.executionTime })
}
```

---

### Option 3: JavaScript Port

**Pros:**
- No compilation needed
- Easy to debug and modify
- Works everywhere

**Cons:**
- Slower than native C++
- Requires manual porting
- May have subtle differences

#### Implementation Steps:

1. **Port C++ to JavaScript:**
```javascript
// src/algorithms/cvrp_36_3972.js

export function selectByLLM1(solution) {
  const MIN_CUSTOMERS_TO_REMOVE = 15
  const MAX_CUSTOMERS_TO_REMOVE = 25
  const P_TOUR_SEGMENT_REMOVAL = 0.38
  
  const selectedCustomers = []
  const numCustomersToRemove = getRandomNumber(
    MIN_CUSTOMERS_TO_REMOVE,
    MAX_CUSTOMERS_TO_REMOVE
  )
  
  // Port the rest of the algorithm logic...
  
  return selectedCustomers
}

export function sortByLLM1(customers, instance) {
  // Port sorting logic...
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

2. **Create Algorithm Registry:**
```javascript
// src/algorithms/registry.js
import * as cvrp_36_3972 from './cvrp_36_3972'
import * as cvrp_36_3980 from './cvrp_36_3980'

export const algorithms = {
  'cvrp_36.3972': cvrp_36_3972,
  'cvrp_36.3980': cvrp_36_3980,
  // ... more algorithms
}
```

3. **Use in App:**
```javascript
import { algorithms } from './algorithms/registry'

const runAlgorithm = async () => {
  const algo = algorithms[selectedAlgorithm.id]
  
  const startTime = performance.now()
  const selectedCustomers = algo.selectByLLM1(solution)
  algo.sortByLLM1(selectedCustomers, instance)
  const endTime = performance.now()
  
  // Process results...
}
```

---

## 🎨 Customization Guide

### Adding New Algorithms

1. Add to algorithm list in `AlgorithmSelector.jsx`:
```javascript
const algorithms = {
  cvrp: [
    // ... existing algorithms
    { id: 'cvrp_new', name: 'New Algorithm', score: 36.5000 }
  ]
}
```

2. Implement the algorithm (depending on chosen integration method)

### Customizing Visualization

Edit `VRPVisualizer.jsx`:

```javascript
// Change colors
const COLORS = ['#ff0000', '#00ff00', '#0000ff']

// Adjust customer size
ctx.arc(customer.x, customer.y, 10, 0, Math.PI * 2) // Larger circles

// Add labels
ctx.fillText(`D:${customer.demand}`, customer.x, customer.y + 20)
```

### Adding New Metrics

In `PerformanceMetrics.jsx`:

```javascript
const metricItems = [
  // ... existing metrics
  { 
    label: 'Vehicle Utilization', 
    value: `${metrics.utilization}%`, 
    icon: '📊' 
  }
]
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Algorithm selection works
- [ ] Parameters update correctly
- [ ] Run button triggers execution
- [ ] Visualization renders routes
- [ ] Metrics display correctly
- [ ] Different VRP types work
- [ ] Responsive on different screen sizes

### Performance Testing

```javascript
// Add to App.jsx for benchmarking
const benchmark = async () => {
  const iterations = 100
  const times = []
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    await runAlgorithm()
    times.push(performance.now() - start)
  }
  
  console.log('Average:', times.reduce((a,b) => a+b) / times.length)
  console.log('Min:', Math.min(...times))
  console.log('Max:', Math.max(...times))
}
```

---

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🐛 Common Issues

### Issue: Canvas not rendering
**Solution:** Check canvas dimensions and ensure solution data is valid

### Issue: Slow performance
**Solution:** Reduce number of customers or optimize rendering loop

### Issue: Algorithm not found
**Solution:** Verify algorithm ID matches registry

---

## 📚 Resources

- [Emscripten Documentation](https://emscripten.org/docs/)
- [Node.js Addons](https://nodejs.org/api/addons.html)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [React Performance](https://react.dev/learn/render-and-commit)

---

## 🎓 Next Steps

1. Choose your integration method
2. Set up the build environment
3. Port/compile one algorithm as a test
4. Integrate with the frontend
5. Test thoroughly
6. Add remaining algorithms
7. Deploy!

Good luck! 🚀
