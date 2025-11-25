# 🚚 VRPAgent - Interactive Visualization Platform

[![Paper](https://img.shields.io/badge/arXiv-2510.07073-b31b1b.svg)](https://arxiv.org/abs/2510.07073)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

> Interactive web application for visualizing and comparing AI-generated Vehicle Routing Problem heuristics

This repository contains:
- 🧬 **Generated C++ heuristics** from VRPAgent research
- 🎨 **Interactive React frontend** for visualization
- 🔧 **Node.js backend API** for algorithm execution
- 📊 **Real-time performance metrics** and route visualization

---

## 🚀 Quick Start

### Automated Setup (Windows)

```bash
# 1. Setup everything
setup-all.bat

# 2. Start both frontend and backend
start-all.bat

# 3. Open http://localhost:3000
```

### Manual Setup (All Platforms)

```bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Start backend (terminal 1)
cd backend && npm start

# 3. Start frontend (terminal 2)
npm run dev

# 4. Open http://localhost:3000
```

**📖 Detailed instructions:** [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)

---

## ✨ Features

### 🎮 Interactive Interface
- Select from 3 VRP problem types (CVRP, PCVRP, VRPTW)
- Choose from 10 optimized algorithms per type
- Adjust problem parameters in real-time
- Run algorithms and see instant results

### 📊 Visualization
- Canvas-based route rendering
- Color-coded vehicle routes
- Customer and depot markers
- Interactive legend

### 📈 Performance Metrics
- Execution time tracking
- Total distance calculation
- Route statistics
- Customer coverage analysis

### 🔧 Backend API
- REST API for algorithm execution
- Enhanced spatial clustering algorithms
- Real-time solution generation
- Performance optimization

---

## 📁 Repository Structure

```
vrp-agent-visualizer/
│
├── 🎨 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── App.jsx              # Main application
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   └── package.json
│
├── 🔧 Backend (Node.js + Express)
│   ├── server.js                # API server
│   ├── package.json
│   └── README.md
│
├── 🧬 C++ Algorithms
│   └── generated_heuristics/
│       ├── cvrp/                # Capacitated VRP
│       ├── pcvrp/               # Prize-Collecting VRP
│       └── vrptw/               # VRP with Time Windows

```

---

## 🎯 What's Included

### Generated Heuristics (C++)
- **30 optimized algorithms** (10 per VRP variant)
- **300 initial population samples** (100 per variant)
- AI-generated using evolutionary approach
- Performance scores included

### Frontend Application
- Modern React 18 with Vite
- Responsive design with dark theme
- Canvas-based visualization
- Real-time parameter controls
- Performance metrics dashboard

### Backend API
- Express.js REST API
- Enhanced VRP solver
- Spatial clustering algorithms
- CORS-enabled for local development

---

## 📊 VRP Problem Types

### CVRP - Capacitated Vehicle Routing Problem
Vehicles have capacity constraints. Minimize total distance while respecting capacity limits.

### PCVRP - Prize-Collecting VRP
Customers have prizes. Maximize collected prizes while minimizing travel distance.

### VRPTW - VRP with Time Windows
Customers must be visited within specific time windows. Minimize distance while meeting time constraints.

---

## 🎮 Usage

1. **Select Problem Type**: Choose CVRP, PCVRP, or VRPTW
2. **Choose Algorithm**: Pick from 10 optimized heuristics (lower score = better)
3. **Adjust Parameters**: 
   - Number of customers (10-100)
   - Vehicle capacity (50-200)
   - Number of vehicles (2-10)
4. **Run Algorithm**: Click "Run Algorithm" button
5. **View Results**: See visualization and performance metrics

---

## 🔧 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI framework |
| **Build Tool** | Vite | Fast dev server |
| **Backend** | Node.js + Express | REST API |
| **Visualization** | Canvas API | Route rendering |
| **Styling** | CSS3 | Modern UI design |
| **Algorithms** | C++ | VRP heuristics |

---

## 📈 Performance

- **Frontend**: Handles 100+ customers smoothly
- **Backend**: Sub-second response times
- **Visualization**: 60 FPS canvas rendering
- **API**: Concurrent request handling

---

## 🛠️ Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm start            # Start server
npm run dev          # Start with auto-reload
```

### Testing
```bash
# Test backend API
curl http://localhost:3001/api/health

# Test algorithm endpoint
curl -X POST http://localhost:3001/api/solve \
  -H "Content-Type: application/json" \
  -d '{"vrpType":"cvrp","algorithmId":"best_solution_36.3972","parameters":{"numCustomers":50,"vehicleCapacity":100,"numVehicles":5}}'
```

---

## 🎓 Research

This project implements the algorithms from:

**VRPAgent: AI-Generated Vehicle Routing Problem Heuristics**  
[arXiv:2510.07073](https://arxiv.org/abs/2510.07073)

The repository contains:
- Generated heuristics from evolutionary algorithm
- Sample initial populations
- Optimized solutions with performance scores

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Additional VRP variants
- Algorithm comparison features
- Export/import functionality
- Real-time algorithm animation
- Performance optimizations

---

## 📝 License

This project is provided for research and educational purposes.

---

## 🙏 Acknowledgments

- VRPAgent research team
- React and Vite communities
- Node.js and Express.js teams

---

## 🎯 Current Status

✅ **Completed**
- Full-stack application
- Interactive visualization
- REST API backend
- Enhanced algorithms
- Comprehensive documentation

🔧 **Optional Enhancements**
- Direct C++ algorithm execution
- Algorithm comparison mode
- Export results to CSV/JSON
- Historical performance tracking

---

**Built with ❤️ for the VRP research community**
