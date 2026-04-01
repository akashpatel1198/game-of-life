# Game of Life

An interactive Conway's Game of Life simulator built with Next.js. Click cells, drop patterns, watch things evolve.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- HTML5 Canvas for grid rendering

## Live Version

> **[https://game-of-life-explore.vercel.app/](https://game-of-life-explore.vercel.app/)

Open the site, click "Start Simulation" on the landing page, and you're in. Click cells to toggle them alive/dead, or pick a pattern from the sidebar and place it on the grid. Hit play and watch it run. You can also randomize the grid, adjust speed, and resize the grid from the settings panel.

## Local Development

### Prerequisites

- Node.js (v18+)
- npm

### Setup

```bash
git clone https://github.com/your-username/game-of-life.git
cd game-of-life
npm install
npm run dev
```

App runs at `http://localhost:3000`.

### Environment Variables

None. No API keys, no backend, no external services. Everything runs client-side.

## Project Structure

```
app/
├── page.tsx                    # Landing page (rules, explanation, CTA)
├── layout.tsx                  # Root layout with ThemeProvider
├── globals.css                 # Global styles, theme CSS variables
└── game/
    ├── page.tsx                # Game page with GameProvider
    └── _gameComponents/
        ├── Grid.tsx            # Canvas-based grid rendering
        ├── TopBar.tsx          # Play/pause/step/clear controls
        ├── SettingsPanel.tsx   # Grid size and speed sliders
        ├── PatternPanel.tsx    # Pattern library sidebar
        └── PatternPicker.tsx   # Individual pattern card

contexts/
├── GameContext.tsx              # Game state (useReducer), game loop
└── ThemeContext.tsx             # Dark/light theme toggle

lib/
├── gameLogic.ts                # Conway's rules, grid operations
├── patterns.ts                 # 20+ pattern definitions
└── types.ts                    # TypeScript types, default config
```

## Scripts

```bash
npm run dev       # Dev server
npm run build     # Production build
npm start         # Start production server
npm run lint      # ESLint
```

## How It Works

The game logic lives in `lib/gameLogic.ts` and implements the four standard rules:

1. Any live cell with fewer than 2 neighbors dies (underpopulation)
2. Any live cell with 2 or 3 neighbors survives
3. Any live cell with more than 3 neighbors dies (overpopulation)
4. Any dead cell with exactly 3 neighbors becomes alive (reproduction)

The grid renders on an HTML5 Canvas for performance. Game state is managed with `useReducer` in a React context, and the simulation loop uses `requestAnimationFrame`. Theme preference is stored in `localStorage`.

The pattern library includes still lifes, oscillators, spaceships, guns, and other classic configurations. Patterns can be rotated before placement.
