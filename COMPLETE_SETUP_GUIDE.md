# 🚀 Complete Setup Guide - VRPAgent Full Stack

This guide will help you set up and run the complete VRPAgent application with both frontend and backend.

---

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Windows** (scripts provided for Windows, but works on Mac/Linux too)

---

## ⚡ Quick Start (Automated Setup)

### Option 1: One-Click Setup (Windows)

```bash
# Run the automated setup script
setup-all.bat
```

This will:
1. Check Node.js installation
2. Install frontend dependencies
3. Install backend dependencies
4. Show you how to start the servers

### Option 2: Start Everything at Once (Windows)

After setup, run:
```bash
start-all.bat
```

This opens two terminal windows:
- One for the backend (port 3001)
- One for the frontend (port 3000)

---

## 🔧 Manual Setup

### Step 1: Install Frontend Dependencies

```bash
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 3: Start the Backend

In one terminal:
```bash
cd backend
npm start
```

You should see:
```
🚀 VRP Agent Backend running on http://localhost:3001
📊 API endpoints:
   GET  /api/health - Health check
   GET  /api/algorithms - List available algorithms
   POST /api/solve - Solve VRP problem
```

### Step 4: Start the Frontend

In another terminal:
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

---

## 🎯 Verify Everything Works

### 1. Check Backend Health

Open: http://localhost:3001/api/health

You should see:
```json
{
  "status": "ok",
  "message": "VRP Agent Backend is running"
}
```

### 2. Test the Frontend

1. Select a problem type (CVRP, PCVRP, or VRPTW)
2. Choose an algorithm
3. Adjust parameters
4. Click "Run Algorithm"
5. See the visualization and metrics

---

## 📁 Project Structure

```
vrp-agent-visualizer/
│
├── 🎨 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── 🔧 Backend (Node.js + Express)
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── 🧬 C++ Algorithms
│   └── generated_heuristics/
│       ├── cvrp/
│       ├── pcvrp/
│       └── vrptw/
│
└── 📚 Documentation
    ├── START_HERE.md
    ├── QUICKSTART.md
    ├── COMPLETE_SETUP_GUIDE.md (you are here)
    └── ... (more guides)
```

---

## 🔄 How It Works

```
┌─────────────┐         HTTP          ┌─────────────┐
│   Browser   │ ◄──────────────────► │   Backend   │
│             │   POST /api/solve     │   (Node.js) │
│  React App  │                       │             │
│  Port 3000  │                       │  Port 3001  │
└─────────────┘                       └─────────────┘
                                             │
                                             ▼
                                      ┌─────────────┐
                                      │ VRP Solver  │
                                      │ (Enhanced   │
                                      │  Algorithm) │
                                      └─────────────┘
```

### Request Flow:

1. User selects algorithm and parameters in frontend
2. Frontend sends POST request to backend `/api/solve`
3. Backend generates VRP solution using algorithm
4. Backend returns solution with metrics
5. Frontend visualizes routes on canvas
6. Frontend displays performance metrics

---

## 🎮 Using the Application

### 1. Select Problem Type

Choose from:
- **CVRP** - Capacitated Vehicle Routing Problem
- **PCVRP** - Prize-Collecting VRP
- **VRPTW** - VRP with Time Windows

### 2. Choose Algorithm

Each problem type has 10 optimized algorithms.
- Lower score = better performance
- 🏆 indicates the best algorithm

### 3. Adjust Parameters

- **Number of Customers**: 10-100
- **Vehicle Capacity**: 50-200
- **Number of Vehicles**: 2-10

### 4. Run Algorithm

Click "▶️ Run Algorithm" button

### 5. View Results

**Visualization:**
- Yellow circle = Depot
- Colored circles = Customers
- Dashed lines = Routes
- Legend shows route assignments

**Metrics:**
- ⏱️ Execution Time (ms)
- 📏 Total Distance
- 🚛 Number of Routes
- 📊 Average Route Length
- 👥 Customers Served

---

## 🛠️ Development Commands

### Frontend

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend

```bash
# Start server
npm start

# Start with auto-reload (development)
npm run dev
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error: Port 3001 already in use**

Solution:
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Or change the port in `backend/server.js`:
```javascript
const PORT = 3002; // Change to any available port
```

### Frontend can't connect to backend

**Error: Failed to fetch**

Check:
1. Backend is running on port 3001
2. No firewall blocking localhost
3. CORS is enabled (already configured)

Test backend manually:
```bash
curl http://localhost:3001/api/health
```

### Dependencies won't install

Solution:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Visualization not showing

Check:
1. Algorithm is selected
2. "Run Algorithm" was clicked
3. Browser console for errors (F12)
4. Backend returned valid data

---

## 🔐 Security Notes

### For Development
- Backend accepts all CORS requests (for local development)
- No authentication required

### For Production
You should add:
- API authentication
- Rate limiting
- Input validation
- HTTPS
- Environment variables for configuration

---

## 🚀 Performance Tips

### Frontend
- Reduce number of customers for faster rendering
- Use Chrome/Edge for best Canvas performance
- Close other browser tabs

### Backend
- Use `npm run dev` for auto-reload during development
- Use `npm start` for production (no auto-reload overhead)

---

## 📊 Current Implementation Status

### ✅ Completed
- Full-stack architecture
- REST API backend
- React frontend with visualization
- Algorithm selection
- Parameter controls
- Performance metrics
- Enhanced mock algorithms (spatially aware)

### 🔧 Next Steps (Optional)
- Integrate actual C++ algorithm execution
- Add algorithm comparison mode
- Export results to CSV/JSON
- Save/load problem instances
- Real-time algorithm animation

---

## 🎓 Learning Resources

### Frontend
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Canvas API Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

### Backend
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [REST API Best Practices](https://restfulapi.net/)

### VRP Algorithms
- [VRPAgent Paper](https://arxiv.org/abs/2510.07073)
- [Vehicle Routing Problem Overview](https://en.wikipedia.org/wiki/Vehicle_routing_problem)

---

## 📝 Configuration Files

### Frontend Configuration

**vite.config.js** - Build configuration
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // Change frontend port here
  }
})
```

### Backend Configuration

**server.js** - Server settings
```javascript
const PORT = 3001;  // Change backend port here
```

---

## 🎯 Testing the API

### Using curl

```bash
# Health check
curl http://localhost:3001/api/health

# Get algorithms
curl http://localhost:3001/api/algorithms

# Solve problem
curl -X POST http://localhost:3001/api/solve \
  -H "Content-Type: application/json" \
  -d "{\"vrpType\":\"cvrp\",\"algorithmId\":\"best_solution_36.3972\",\"parameters\":{\"numCustomers\":50,\"vehicleCapacity\":100,\"numVehicles\":5}}"
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:3001/api/solve`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "vrpType": "cvrp",
  "algorithmId": "best_solution_36.3972",
  "parameters": {
    "numCustomers": 50,
    "vehicleCapacity": 100,
    "numVehicles": 5
  }
}
```

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:3001/api/health
- [ ] Can select algorithms
- [ ] Can adjust parameters
- [ ] Can run algorithm and see results
- [ ] Visualization displays correctly
- [ ] Metrics show accurate data

---

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review backend logs in the terminal
3. Check browser console (F12) for frontend errors
4. Verify both servers are running
5. Test backend API directly with curl

---

## 🎊 You're All Set!

Your VRPAgent application is now running with:
- ✅ Interactive frontend
- ✅ REST API backend
- ✅ Algorithm selection
- ✅ Real-time visualization
- ✅ Performance metrics

**Next:** Try different algorithms and parameters to see how they affect the solutions!

---

**Happy Routing! 🚚📦**
