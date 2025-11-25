/**
 * Performance Benchmark Test
 * Measures backend performance under various loads
 */

const BASE_URL = 'http://localhost:3001';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test configurations
const TESTS = [
  { name: 'Small (10 customers)', customers: 10, vehicles: 2, capacity: 100 },
  { name: 'Medium (50 customers)', customers: 50, vehicles: 5, capacity: 100 },
  { name: 'Large (100 customers)', customers: 100, vehicles: 10, capacity: 150 }
];

const ITERATIONS = 5;

async function benchmarkConfiguration(config) {
  const times = [];
  const distances = [];
  
  for (let i = 0; i < ITERATIONS; i++) {
    try {
      const startTime = Date.now();
      
      const response = await fetch(`${BASE_URL}/api/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vrpType: 'cvrp',
          algorithmId: 'best_solution_36.3972',
          parameters: {
            numCustomers: config.customers,
            vehicleCapacity: config.capacity,
            numVehicles: config.vehicles
          }
        })
      });
      
      const data = await response.json();
      const endTime = Date.now();
      
      times.push(endTime - startTime);
      distances.push(data.metrics.totalDistance);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error in iteration ${i + 1}:`, error.message);
    }
  }
  
  return {
    avgTime: times.reduce((a, b) => a + b, 0) / times.length,
    minTime: Math.min(...times),
    maxTime: Math.max(...times),
    avgDistance: distances.reduce((a, b) => a + b, 0) / distances.length,
    times,
    distances
  };
}

async function runPerformanceBenchmark() {
  console.log('\n' + '='.repeat(70));
  log('Performance Benchmark Test', 'bold');
  console.log('='.repeat(70));
  
  // Check server
  try {
    await fetch(`${BASE_URL}/api/health`);
    log('\n✓ Backend server is running', 'green');
  } catch (error) {
    log('\n❌ Backend server is not running!', 'red');
    log('Please start: cd backend && npm start', 'yellow');
    process.exit(1);
  }
  
  log(`\nRunning ${ITERATIONS} iterations per configuration...`, 'blue');
  
  const results = [];
  
  for (const config of TESTS) {
    console.log('\n' + '-'.repeat(70));
    log(`Testing: ${config.name}`, 'yellow');
    log(`  Customers: ${config.customers}, Vehicles: ${config.vehicles}, Capacity: ${config.capacity}`);
    
    const result = await benchmarkConfiguration(config);
    results.push({ config, ...result });
    
    log(`\n  Results:`, 'blue');
    log(`    Average Time: ${result.avgTime.toFixed(2)}ms`);
    log(`    Min Time: ${result.minTime}ms`);
    log(`    Max Time: ${result.maxTime}ms`);
    log(`    Average Distance: ${result.avgDistance.toFixed(2)}`);
    
    // Performance rating
    if (result.avgTime < 100) {
      log(`    Performance: Excellent ⚡`, 'green');
    } else if (result.avgTime < 500) {
      log(`    Performance: Good ✓`, 'green');
    } else if (result.avgTime < 1000) {
      log(`    Performance: Acceptable ⚠`, 'yellow');
    } else {
      log(`    Performance: Slow 🐌`, 'red');
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  log('Performance Summary', 'bold');
  console.log('='.repeat(70));
  
  log('\nResponse Times:', 'blue');
  results.forEach(r => {
    log(`  ${r.config.name}: ${r.avgTime.toFixed(2)}ms (${r.minTime}-${r.maxTime}ms)`);
  });
  
  log('\nScalability Analysis:', 'blue');
  const smallTime = results[0].avgTime;
  const mediumTime = results[1].avgTime;
  const largeTime = results[2].avgTime;
  
  log(`  10 → 50 customers: ${(mediumTime / smallTime).toFixed(2)}x slower`);
  log(`  50 → 100 customers: ${(largeTime / mediumTime).toFixed(2)}x slower`);
  log(`  10 → 100 customers: ${(largeTime / smallTime).toFixed(2)}x slower`);
  
  // Throughput estimation
  log('\nEstimated Throughput:', 'blue');
  results.forEach(r => {
    const requestsPerSecond = 1000 / r.avgTime;
    log(`  ${r.config.name}: ~${requestsPerSecond.toFixed(1)} requests/second`);
  });
  
  console.log('\n' + '='.repeat(70));
  log('Benchmark Complete!', 'green');
  console.log('='.repeat(70) + '\n');
}

// Run benchmark
runPerformanceBenchmark().catch(error => {
  console.error('Benchmark error:', error);
  process.exit(1);
});
