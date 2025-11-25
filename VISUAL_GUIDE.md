# 🎨 Visual Guide - VRPAgent Frontend

## 📱 User Interface Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                    🚚 VRPAgent Visualizer                           │
│     Interactive visualization of AI-generated VRP heuristics        │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────────────────────────────┐
│  LEFT PANEL (400px)  │         RIGHT PANEL (Flexible)               │
│                      │                                              │
│ ┌──────────────────┐ │  ┌────────────────────────────────────────┐ │
│ │ Problem Type     │ │  │                                        │ │
│ │ ┌──────────────┐ │ │  │         Route Visualization            │ │
│ │ │ CVRP  ✓      │ │ │  │                                        │ │
│ │ │ PCVRP        │ │ │  │              🟡 Depot                  │ │
│ │ │ VRPTW        │ │ │  │                                        │ │
│ │ └──────────────┘ │ │  │    🔵─────🔵─────🔵                   │ │
│ └──────────────────┘ │  │   /                 \                  │ │
│                      │  │  🟡                   🟡                │ │
│ ┌──────────────────┐ │  │   \                 /                  │ │
│ │ Select Algorithm │ │  │    🔴─────🔴─────🔴                   │ │
│ │                  │ │  │                                        │ │
│ │ • Best 36.3972 🏆│ │  │  Legend:                               │ │
│ │ • Best 36.3980   │ │  │  ▪ Route 1 (3)  ▪ Route 2 (3)         │ │
│ │ • Best 36.4030   │ │  │                                        │ │
│ └──────────────────┘ │  └────────────────────────────────────────┘ │
│                      │                                              │
│ ┌──────────────────┐ │                                              │
│ │ Parameters       │ │                                              │
│ │                  │ │                                              │
│ │ Customers: 50    │ │                                              │
│ │ ━━━━━●━━━━━━     │ │                                              │
│ │                  │ │                                              │
│ │ Capacity: 100    │ │                                              │
│ │ ━━━━━●━━━━━━     │ │                                              │
│ │                  │ │                                              │
│ │ Vehicles: 5      │ │                                              │
│ │ ━━━━━●━━━━━━     │ │                                              │
│ └──────────────────┘ │                                              │
│                      │                                              │
│ ┌──────────────────┐ │                                              │
│ │  ▶️ Run Algorithm│ │                                              │
│ └──────────────────┘ │                                              │
│                      │                                              │
│ ┌──────────────────┐ │                                              │
│ │ Performance      │ │                                              │
│ │                  │ │                                              │
│ │ ⏱️ Time: 245ms   │ │                                              │
│ │ 📏 Distance: 1234│ │                                              │
│ │ 🚛 Routes: 5     │ │                                              │
│ │ 📊 Avg: 246.8    │ │                                              │
│ │ 👥 Served: 50    │ │                                              │
│ └──────────────────┘ │                                              │
└──────────────────────┴──────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme

### Primary Colors
```
Background:     #0f172a (Dark Blue)
Panel:          #1e293b (Slate)
Accent:         #667eea → #764ba2 (Purple Gradient)
Text:           #f1f5f9 (Light Gray)
Secondary Text: #cbd5e1 (Medium Gray)
```

### Route Colors
```
Route 1:  #667eea (Blue)
Route 2:  #f56565 (Red)
Route 3:  #48bb78 (Green)
Route 4:  #ed8936 (Orange)
Route 5:  #9f7aea (Purple)
Route 6:  #38b2ac (Teal)
Route 7:  #ed64a6 (Pink)
Route 8:  #ecc94b (Yellow)
Route 9:  #4299e1 (Light Blue)
Route 10: #fc8181 (Light Red)
```

---

## 🖱️ User Interaction Flow

```
START
  │
  ▼
┌─────────────────────┐
│ Select Problem Type │
│  (CVRP/PCVRP/VRPTW) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Choose Algorithm    │
│ (from 5 options)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Adjust Parameters   │
│ (sliders)           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Click "Run"         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ View Visualization  │
│ & Metrics           │
└──────────┬──────────┘
           │
           ▼
    ┌──────┴──────┐
    │             │
    ▼             ▼
Adjust Params  Try Another
& Re-run       Algorithm
```

---

## 📊 Component Hierarchy

```
App
├── AlgorithmSelector
│   ├── VRP Type Buttons (3)
│   └── Algorithm List (5 per type)
│
├── ParameterPanel
│   ├── Customer Count Slider
│   ├── Vehicle Capacity Slider
│   └── Vehicle Count Slider
│
├── Run Button
│
├── PerformanceMetrics
│   ├── Execution Time Card
│   ├── Total Distance Card
│   ├── Route Count Card
│   ├── Avg Route Length Card
│   └── Customers Served Card
│
└── VRPVisualizer
    ├── Canvas Element
    ├── Depot Marker
    ├── Customer Markers
    ├── Route Lines
    └── Legend
```

---

## 🎯 Visual States

### 1. Initial State (No Algorithm Selected)
```
┌─────────────────────────────┐
│                             │
│         🗺️                  │
│                             │
│  Select an algorithm and    │
│  click "Run" to visualize   │
│                             │
└─────────────────────────────┘
```

### 2. Running State
```
┌──────────────────────┐
│  ⏳ Running...       │  (Button disabled, animated)
└──────────────────────┘
```

### 3. Results State
```
┌─────────────────────────────┐
│  Routes displayed with:     │
│  • Color-coded paths        │
│  • Customer numbers         │
│  • Depot highlighted        │
│  • Legend showing routes    │
└─────────────────────────────┘
```

---

## 🎨 Visual Elements

### Depot Representation
```
    ⭐
   ╱  ╲
  ╱    ╲
 ╱  🏢  ╲
╱________╲

Yellow circle with white border
Radius: 12px
Position: Center of canvas
```

### Customer Representation
```
   (1)
    ●

Colored circle (8px radius)
White border (1.5px)
ID number above
```

### Route Lines
```
Depot ●╌╌╌╌╌╌● Customer 1
      ╌╌╌╌╌╌● Customer 2
      ╌╌╌╌╌╌● Customer 3
      ╌╌╌╌╌╌● Back to Depot

Dashed lines (5px dash, 5px gap)
Color matches route
Width: 2px
```

---

## 📱 Responsive Breakpoints

### Desktop (> 1200px)
```
┌────────────┬─────────────────────┐
│  Sidebar   │   Visualization     │
│  (400px)   │   (Flexible)        │
└────────────┴─────────────────────┘
```

### Tablet/Mobile (< 1200px)
```
┌─────────────────────────────────┐
│         Sidebar                 │
│         (Full Width)            │
├─────────────────────────────────┤
│      Visualization              │
│      (Full Width)               │
└─────────────────────────────────┘
```

---

## 🎭 Animation & Transitions

### Hover Effects
- **Buttons**: Lift up 2px, increase shadow
- **Algorithm Cards**: Slide right 4px, border glow
- **Metric Cards**: Slide right 4px, background lighten

### Transitions
- All: `0.3s ease`
- Smooth, not jarring
- Consistent across components

### Loading State
- Button text changes
- Opacity reduces to 60%
- Cursor changes to not-allowed

---

## 🎨 Typography

```
Headings (h1):  2.5rem, bold
Headings (h2):  1.3rem, semi-bold
Body:           1rem, normal
Small:          0.85rem, normal
Metrics:        1.2rem, semi-bold

Font Family: System fonts
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
```

---

## 🖼️ Canvas Rendering

### Rendering Order
1. Clear canvas (dark background)
2. Draw all route lines (dashed)
3. Draw all customer circles
4. Draw customer IDs
5. Draw depot (on top)
6. Draw legend box

### Performance
- Single render pass
- No unnecessary redraws
- Optimized for 100+ customers

---

## 🎯 Visual Feedback

### Success States
- ✅ Algorithm selected: Purple gradient background
- ✅ Parameters changed: Value updates in real-time
- ✅ Run complete: Metrics appear with animation

### Error States
- ❌ No algorithm: Button disabled (gray)
- ❌ Running: Button shows loading state

### Hover States
- 🖱️ Buttons: Lift and glow
- 🖱️ Cards: Slide and highlight
- 🖱️ Sliders: Thumb enlarges

---

## 📐 Spacing System

```
Extra Small:  4px
Small:        8px
Medium:       12px
Large:        20px
Extra Large:  30px

Consistent throughout the app
```

---

## 🎨 Shadow System

```
Small:  0 2px 4px rgba(0, 0, 0, 0.3)
Medium: 0 4px 6px rgba(0, 0, 0, 0.3)
Large:  0 6px 12px rgba(102, 126, 234, 0.6)

Used for depth and hierarchy
```

---

This visual guide helps you understand the design system and make consistent modifications to the UI!
