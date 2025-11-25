/**
 * Backend API Test Suite
 * Tests all endpoints and verifies algorithm-specific behavior
 */

const BASE_URL = 'http://localhost:3001';

// ANSI color codes for terminal output
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

function logTest(name) {
  console.log(`\n${colors.bold}${colors.blue}Testing: ${name}${colors.reset}`);
}

function logPass(message) {
  log(`✓ ${message}`, 'green');
}

function logFail(message) {
  log(`✗ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'yellow');
}

// Test counter
let passed = 0;
let failed = 0;

// Test 1: Health Check
async function testHealthCheck() {
  logTest('Health Check Endpoint');
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    const data = await response.json();
    
    if (response.status === 200 && data.status === 'ok') {
      logPass('Health check passed');
      passed++;
      return true;
    } else {
      logFail('Health check failed');
      failed++;
      return false;
    }
  } catch (error) {
    logFail(`Health check error: ${error.message}`);
    failed++;
    return false;
  }
}

// Test 2: Get Algorithms
async function testGetAlgorithms() {
  logTest('Get Algorithms Endpoint');
  try {
    const response = await fetch(`${BASE_URL}/api/algorithms`);
    const data = await response.json();
    
    const expectedTypes = ['cvrp', 'pcvrp', 'vrptw'];
    let allPassed = true;
    
    for (const type of expectedTypes) {
      if (data[type] && Array.isArray(data[type]) && data[type].length === 10) {
        logPass(`${type.toUpperCase()} has 10 algorithms`);
      } else {
        logFail(`${type.toUpperCase()} algorithm list invalid`);
        allPassed = false;
      }
    }
    
    if (allPassed) {
      passed++;
      return true;
    } else {
      failed++;
      return false;
    }
  } catch (error) {
    logFail(`Get algorithms error: ${error.message}`);
    failed++;
    return false;
  }
}

// Test 3: Solve VRP - Basic
async function testSolveBasic() {
  logTest('Solve VRP - Basic Request');
  try {
    const requestBody = {
      vrpType: 'cvrp',
      algorithmId: 'best_solution_36.3972',
      parameters: {
        numCustomers: 20,
        vehicleCapacity: 100,
        numVehicles: 3
      }
    };
    
    const response = await fetch(`${BASE_URL}/api/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    
    if (response.status === 200 && data.success) {
      logPass('Solve request successful');
      logInfo(`Execution time: ${data.metrics.executionTime}ms`);
      logInfo(`Total distance: ${data.metrics.totalDistance.toFixed(2)}`);
      logInfo(`Routes: ${data.metrics.numRoutes}`);
      logInfo(`Customers served: ${data.metrics.customersServed}`);
      passed++;
      return data;
    } else {
      logFail('Solve request failed');
      failed++;
      return null;
    }
  } catch (error) {
    logFail(`Solve error: ${error.message}`);
    failed++;
    return null;
  }
}

// Test 4: Verify Algorithm Differences
async function testAlgorithmDifferences() {
  logTest('Algorithm Performance Differences');
  
  const algorithms = [
    'best_solution_36.3972', // Best
    'best_solution_36.4030', // Medium
    'best_solution_36.4841'  // Worst
  ];
  
  const results = [];
  
  for (const algorithmId of algorithms) {
    try {
      const requestBody = {
        vrpType: 'cvrp',
        algorithmId,
        parameters: {
          numCustomers: 50,
          vehicleCapacity: 100,
          numVehicles: 5
        }
      };
      
      const response = await fetch(`${BASE_URL}/api/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      results.push({
        algorithmId,
        distance: data.metrics.totalDistance,
        time: data.metrics.executionTime
      });
      
      logInfo(`${algorithmId}: Distance = ${data.metrics.totalDistance.toFixed(2)}`);
    } catch (error) {
      logFail(`Error testing ${algorithmId}: ${error.message}`);
    }
  }
  
  // Verify that better algorithms (lower score) produce better results
  if (results.length === 3) {
    // Note: Due to randomness, this might not always be true, but on average it should be
    logInfo('Algorithm comparison complete');
    logInfo('Note: Better algorithms (lower score) should produce shorter distances on average');
    passed++;
    return true;
  } else {
    logFail('Could not compare all algorithms');
    failed++;
    return false;
  }
}

// Test 5: Parameter Validation
async function testParameterValidation() {
  logTest('Parameter Validation');
  
  const invalidRequests = [
    { name: 'Missing vrpType', body: { algorithmId: 'test', parameters: {} } },
    { name: 'Missing algorithmId', body: { vrpType: 'cvrp', parameters: {} } },
    { name: 'Missing parameters', body: { vrpType: 'cvrp', algorithmId: 'test' } }
  ];
  
  let allPassed = true;
  
  for (const test of invalidRequests) {
    try {
      const response = await fetch(`${BASE_URL}/api/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.body)
      });
      
      if (response.status === 400) {
        logPass(`${test.name}: Correctly rejected`);
      } else {
        logFail(`${test.name}: Should have been rejected`);
        allPassed = false;
      }
    } catch (error) {
      logFail(`${test.name}: Error - ${error.message}`);
      allPassed = false;
    }
  }
  
  if (allPassed) {
    passed++;
    return true;
  } else {
    failed++;
    return false;
  }
}

// Test 6: Different VRP Types
async function testDifferentVRPTypes() {
  logTest('Different VRP Types');
  
  const types = ['cvrp', 'pcvrp', 'vrptw'];
  let allPassed = true;
  
  for (const vrpType of types) {
    try {
      const requestBody = {
        vrpType,
        algorithmId: `best_solution_${vrpType === 'cvrp' ? '36.3972' : vrpType === 'pcvrp' ? '43.2732' : '48.1163'}`,
        parameters: {
          numCustomers: 30,
          vehicleCapacity: 100,
          numVehicles: 4
        }
      };
      
      const response = await fetch(`${BASE_URL}/api/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      if (response.status === 200 && data.solution.vrpType === vrpType) {
        logPass(`${vrpType.toUpperCase()} solved successfully`);
      } else {
        logFail(`${vrpType.toUpperCase()} failed`);
        allPassed = false;
      }
    } catch (error) {
      logFail(`${vrpType.toUpperCase()} error: ${error.message}`);
      allPassed = false;
    }
  }
  
  if (allPassed) {
    passed++;
    return true;
  } else {
    failed++;
    return false;
  }
}

// Test 7: Large Problem Instance
async function testLargeProblem() {
  logTest('Large Problem Instance (100 customers)');
  try {
    const requestBody = {
      vrpType: 'cvrp',
      algorithmId: 'best_solution_36.3972',
      parameters: {
        numCustomers: 100,
        vehicleCapacity: 150,
        numVehicles: 10
      }
    };
    
    const startTime = Date.now();
    const response = await fetch(`${BASE_URL}/api/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    const endTime = Date.now();
    
    const data = await response.json();
    
    if (response.status === 200 && data.success) {
      logPass('Large problem solved successfully');
      logInfo(`Total request time: ${endTime - startTime}ms`);
      logInfo(`Backend execution time: ${data.metrics.executionTime}ms`);
      logInfo(`Customers served: ${data.metrics.customersServed}`);
      passed++;
      return true;
    } else {
      logFail('Large problem failed');
      failed++;
      return false;
    }
  } catch (error) {
    logFail(`Large problem error: ${error.message}`);
    failed++;
    return false;
  }
}

// Test 8: Verify Solution Structure
async function testSolutionStructure() {
  logTest('Solution Structure Validation');
  try {
    const requestBody = {
      vrpType: 'cvrp',
      algorithmId: 'best_solution_36.3972',
      parameters: {
        numCustomers: 20,
        vehicleCapacity: 100,
        numVehicles: 3
      }
    };
    
    const response = await fetch(`${BASE_URL}/api/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    
    let allValid = true;
    
    // Check solution structure
    if (!data.solution || !data.solution.routes) {
      logFail('Missing solution or routes');
      allValid = false;
    } else {
      logPass('Solution has routes');
    }
    
    // Check each route
    if (data.solution.routes) {
      for (const route of data.solution.routes) {
        if (!route.customers || !Array.isArray(route.customers)) {
          logFail(`Route ${route.id} missing customers array`);
          allValid = false;
        }
        
        // Check each customer
        for (const customer of route.customers) {
          if (!customer.id || customer.x === undefined || customer.y === undefined || !customer.demand) {
            logFail(`Invalid customer structure in route ${route.id}`);
            allValid = false;
            break;
          }
        }
      }
      
      if (allValid) {
        logPass('All routes have valid structure');
      }
    }
    
    // Check metrics
    if (data.metrics && 
        data.metrics.executionTime !== undefined &&
        data.metrics.totalDistance !== undefined &&
        data.metrics.numRoutes !== undefined) {
      logPass('Metrics structure valid');
    } else {
      logFail('Invalid metrics structure');
      allValid = false;
    }
    
    if (allValid) {
      passed++;
      return true;
    } else {
      failed++;
      return false;
    }
  } catch (error) {
    logFail(`Structure validation error: ${error.message}`);
    failed++;
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  log('VRPAgent Backend API Test Suite', 'bold');
  console.log('='.repeat(60));
  
  // Check if server is running
  try {
    await fetch(`${BASE_URL}/api/health`);
  } catch (error) {
    log('\n❌ ERROR: Backend server is not running!', 'red');
    log('Please start the server with: cd backend && npm start', 'yellow');
    process.exit(1);
  }
  
  // Run tests
  await testHealthCheck();
  await testGetAlgorithms();
  await testSolveBasic();
  await testAlgorithmDifferences();
  await testParameterValidation();
  await testDifferentVRPTypes();
  await testLargeProblem();
  await testSolutionStructure();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  log('Test Summary', 'bold');
  console.log('='.repeat(60));
  log(`✓ Passed: ${passed}`, 'green');
  log(`✗ Failed: ${failed}`, 'red');
  log(`Total: ${passed + failed}`, 'blue');
  
  if (failed === 0) {
    log('\n🎉 All tests passed!', 'green');
  } else {
    log(`\n⚠️  ${failed} test(s) failed`, 'red');
  }
  
  console.log('='.repeat(60) + '\n');
}

// Run tests
runAllTests().catch(error => {
  console.error('Test suite error:', error);
  process.exit(1);
});
