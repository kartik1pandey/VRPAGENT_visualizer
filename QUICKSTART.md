# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
npm install
```

### Step 2: Start the Server

```bash
npm run dev
```

### Step 3: Open Browser

Navigate to: **http://localhost:3000**

---

## 🎮 How to Use

### 1. Select Problem Type
Click on one of the three VRP variants:
- **CVRP** - Capacitated Vehicle Routing Problem
- **PCVRP** - Prize-Collecting VRP
- **VRPTW** - VRP with Time Windows

### 2. Choose an Algorithm
Select from the list of optimized heuristics. The score indicates performance (lower is better). Look for the 🏆 badge for the best performer.

### 3. Adjust Parameters
Use the sliders to configure:
- **Number of Customers**: 10-100
- **Vehicle Capacity**: 50-200
- **Number of Vehicles**: 2-10

### 4. Run the Algorithm
Click the **"▶️ Run Algorithm"** button to execute the selected heuristic.

### 5. View Results
- **Left Panel**: Performance metrics including execution time, total distance, and route statistics
- **Right Panel**: Visual representation of the routes with color-coded paths

---

## 📊 Understanding the Visualization

- **Yellow Circle** 🟡 - Depot (starting/ending point)
- **Colored Circles** 🔵🔴🟢 - Customers (numbered)
- **Dashed Lines** - Vehicle routes
- **Legend** - Shows route assignments

---

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is busy, the server will automatically try 3001, 3002, etc.

### Dependencies Not Installing
Try:
```bash
npm cache clean --force
npm install
```

### Blank Screen
1. Check browser console (F12) for errors
2. Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)
3. Try clearing browser cache

---

## 🎯 What's Next?

### Current State
The frontend currently uses **simulated algorithm execution** with mock data to demonstrate the UI and visualization capabilities.

### To Integrate Real C++ Algorithms

You have three options:

#### Option A: WebAssembly (Best Performance)
Compile the C++ heuristics to WebAssembly for direct browser execution.

#### Option B: Backend API (Most Flexible)
Create a Node.js/Express server that runs the C++ code and exposes REST endpoints.

#### Option C: JavaScript Port (Easiest)
Rewrite the algorithms in JavaScript/TypeScript.

See **FRONTEND_README.md** for detailed integration instructions.

---

## 📁 Project Files

```
vrp-agent-visualizer/
├── src/
│   ├── components/          # React components
│   ├── App.jsx             # Main app
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Build config
└── FRONTEND_README.md      # Full documentation
```

---

## 💡 Tips

- **Compare Algorithms**: Run different heuristics with the same parameters to compare performance
- **Experiment with Parameters**: See how changing customer count or vehicle capacity affects routes
- **Watch Execution Time**: Notice how algorithm complexity affects runtime
- **Study the Patterns**: Observe how different heuristics create different routing strategies

---

## 🐛 Found a Bug?

The frontend is a demonstration tool. For issues or improvements, check the code in the `src/` directory.

---

## 📚 Learn More

- **VRPAgent Paper**: https://arxiv.org/abs/2510.07073
- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev

---

**Happy Routing! 🚚📦**
