const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Configure CORS for production
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://vrpagent-visualizer-app.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json({ limit: '50mb' }));

// Store compiled executables
const compiledAlgorithms = new Map();

// Algorithm metadata
const algorithms = {
  cvrp: [
    'best_solution_36.3972',
    'best_solution_36.3980',
    'best_solution_36.4030',
    'best_solution_36.4060',
    'best_solution_36.4121',
    'best_solution_36.4173',
    'best_solution_36.4292',
    'best_solution_36.4608',
    'best_solution_36.4656',
    'best_solution_36.4841'
  ],
  pcvrp: [
    'best_solution_43.2732',
    'best_solution_43.2786',
    'best_solution_43.2794',
    'best_solution_43.2953',
    'best_solution_43.3193',
    'best_solution_43.3323',
    'best_solution_43.3495',
    'best_solution_43.3525',
    'best_solution_43.3917',
    'best_solution_43.5157'
  ],
  vrptw: [
    'best_solution_48.1163',
    'best_solution_48.1390',
    'best_solution_48.1401',
    'best_solution_48.1455',
    'best_solution_48.1539',
    'best_solution_48.1572',
    'best_solution_48.1591',
    'best_solution_48.1627',
    'best_solution_48.1633',
    'best_solution_48.2860'
  ]
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VRP Agent Backend is running' });
});

// Get available algorithms
app.get('/api/algorithms', (req, res) => {
  res.json(algorithms);
});

// Solve VRP problem
app.post('/api/solve', async (req, res) => {
  try {
    const { vrpType, algorithmId, parameters } = req.body;

    if (!vrpType || !algorithmId || !parameters) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log(`Solving ${vrpType} with algorithm ${algorithmId}`);
    console.log('Parameters:', parameters);

    const startTime = Date.now();

    // Generate VRP solution using the algorithm
    const solution = await generateVRPSolution(vrpType, algorithmId, parameters);

    const executionTime = Date.now() - startTime;

    res.json({
      success: true,
      solution,
      metrics: {
        executionTime,
        totalDistance: solution.totalDistance,
        numRoutes: solution.routes.length,
        avgRouteLength: solution.totalDistance / solution.routes.length,
        customersServed: solution.routes.reduce((sum, r) => sum + r.customers.length, 0)
      }
    });

  } catch (error) {
    console.error('Error solving VRP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate VRP solution (currently using enhanced mock data)
async function generateVRPSolution(vrpType, algorithmId, parameters) {
  // For now, we'll use an enhanced algorithm-specific mock
  // This will be replaced with actual C++ execution
  
  const { numCustomers, vehicleCapacity, numVehicles } = parameters;
  
  // Parse algorithm score from ID
  const scoreMatch = algorithmId.match(/(\d+\.\d+)/);
  const algorithmScore = scoreMatch ? parseFloat(scoreMatch[1]) : 40.0;
  
  // Generate customers with spatial clustering
  const customers = generateCustomers(numCustomers, algorithmScore);
  
  // Create routes using a simple nearest neighbor heuristic
  const routes = createRoutes(customers, numVehicles, vehicleCapacity, algorithmScore);
  
  // Calculate total distance
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  
  return {
    routes,
    totalDistance,
    algorithmId,
    vrpType
  };
}

function generateCustomers(numCustomers, algorithmScore) {
  const customers = [];
  const numClusters = Math.floor(numCustomers / 10) + 1;
  const clusters = [];
  
  // Generate cluster centers
  for (let i = 0; i < numClusters; i++) {
    clusters.push({
      x: Math.random() * 700 + 150,
      y: Math.random() * 400 + 100
    });
  }
  
  // Generate customers around clusters
  for (let i = 0; i < numCustomers; i++) {
    const cluster = clusters[i % numClusters];
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 20;
    
    customers.push({
      id: i + 1,
      x: cluster.x + Math.cos(angle) * distance,
      y: cluster.y + Math.sin(angle) * distance,
      demand: Math.floor(Math.random() * 15) + 5
    });
  }
  
  return customers;
}

function createRoutes(customers, numVehicles, vehicleCapacity, algorithmScore) {
  const routes = [];
  const unassigned = [...customers];
  const depotX = 500;
  const depotY = 300;
  
  // Better algorithms (lower score) create more efficient routes
  const efficiencyFactor = 40.0 / algorithmScore;
  
  for (let v = 0; v < numVehicles && unassigned.length > 0; v++) {
    const route = {
      id: v,
      customers: [],
      load: 0,
      distance: 0
    };
    
    // Start from depot
    let currentX = depotX;
    let currentY = depotY;
    
    // Nearest neighbor with capacity constraint
    while (unassigned.length > 0) {
      let nearestIdx = -1;
      let nearestDist = Infinity;
      
      // Find nearest customer that fits capacity
      for (let i = 0; i < unassigned.length; i++) {
        if (route.load + unassigned[i].demand <= vehicleCapacity) {
          const dist = Math.sqrt(
            Math.pow(unassigned[i].x - currentX, 2) +
            Math.pow(unassigned[i].y - currentY, 2)
          );
          
          // Better algorithms make better choices
          const adjustedDist = dist * (1 + (Math.random() - 0.5) * (1 - efficiencyFactor) * 0.3);
          
          if (adjustedDist < nearestDist) {
            nearestDist = adjustedDist;
            nearestIdx = i;
          }
        }
      }
      
      if (nearestIdx === -1) break; // No more customers fit
      
      const customer = unassigned.splice(nearestIdx, 1)[0];
      route.customers.push(customer);
      route.load += customer.demand;
      route.distance += nearestDist;
      
      currentX = customer.x;
      currentY = customer.y;
    }
    
    // Return to depot
    if (route.customers.length > 0) {
      const lastCustomer = route.customers[route.customers.length - 1];
      route.distance += Math.sqrt(
        Math.pow(depotX - lastCustomer.x, 2) +
        Math.pow(depotY - lastCustomer.y, 2)
      );
      
      routes.push(route);
    }
  }
  
  return routes;
}

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 VRP Agent Backend running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   GET  /api/algorithms - List available algorithms`);
    console.log(`   POST /api/solve - Solve VRP problem`);
  });
}

// Export for Vercel serverless
module.exports = app;
