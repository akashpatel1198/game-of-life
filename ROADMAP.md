# Conway's Game of Life - Product Roadmap

## Project Overview
A polished Conway's Game of Life simulator built with Next.js, React 19, and Tailwind CSS v4. Desktop-focused portfolio piece with clean UI/UX.

---

## Phase 1: Core Game Engine
**Goal:** Get the simulation working with basic rendering

- [ ] **1.1** Create game state management (grid data structure, cell states)
- [ ] **1.2** Implement Game of Life rules (birth, survival, death logic)
- [ ] **1.3** Render grid with Tailwind (fixed size, clickable cells)
- [ ] **1.4** Add game loop with `requestAnimationFrame` or `setInterval`
- [ ] **1.5** Basic play/pause functionality

---

## Phase 2: User Controls
**Goal:** Let users interact with and control the simulation

- [ ] **2.1** Click to toggle individual cells
- [ ] **2.2** Click-and-drag to draw multiple cells
- [ ] **2.3** Clear grid button
- [ ] **2.4** Randomize grid button
- [ ] **2.5** Step forward (single generation) button
- [ ] **2.6** Speed control slider (adjust simulation speed)
- [ ] **2.7** Grid size control (adjust rows/columns)

---

## Phase 3: UI Layout & Styling
**Goal:** Clean, polished desktop layout

- [ ] **3.1** Design main layout (sidebar + grid area)
- [ ] **3.2** Style control buttons and sliders
- [ ] **3.3** Add visual feedback (hover states, active states)
- [ ] **3.4** Grid cell styling (borders, alive/dead colors)
- [ ] **3.5** Responsive container (centered grid, proper spacing)

---

## Phase 4: Theme System
**Goal:** Dark mode and theme support

- [ ] **4.1** Set up theme context/provider
- [ ] **4.2** Implement dark/light mode toggle
- [ ] **4.3** Define color palette for both themes
- [ ] **4.4** Persist theme preference to localStorage
- [ ] **4.5** Style all components for both themes

---

## Phase 5: Pattern Library
**Goal:** Pre-made patterns users can place on the grid

- [ ] **5.1** Define pattern data structure (2D arrays)
- [ ] **5.2** Create initial patterns (start with Glider)
- [ ] **5.3** Pattern selection UI in sidebar
- [ ] **5.4** Pattern preview on hover/selection
- [ ] **5.5** Click-to-place pattern on grid
- [ ] **5.6** Pattern rotation (optional: 90° increments)
- [ ] **5.7** Expand pattern library:
  - Oscillators (Blinker, Toad, Beacon, Pulsar)
  - Spaceships (Glider, LWSS)
  - Still lifes (Block, Beehive, Loaf)
  - Guns (Gosper Glider Gun)

---

## Phase 6: Save/Load System
**Goal:** Persist user creations to localStorage

- [ ] **6.1** Save current grid state with custom name
- [ ] **6.2** List saved patterns (max 10)
- [ ] **6.3** Load saved pattern to grid
- [ ] **6.4** Delete saved patterns
- [ ] **6.5** Handle storage limit (warn when at 10, option to overwrite)
- [ ] **6.6** Export/import as JSON (optional)

---

## Phase 7: Info Modal
**Goal:** Brief description of the game for newcomers

- [ ] **7.1** Create modal component
- [ ] **7.2** Write game description content (rules, history)
- [ ] **7.3** Add "How to use" instructions
- [ ] **7.4** Info button to trigger modal
- [ ] **7.5** Keyboard shortcut to close (Esc)

---

## Phase 8: Polish & UX
**Goal:** Final touches for portfolio quality

- [ ] **8.1** Keyboard shortcuts (Space = play/pause, R = randomize, C = clear)
- [ ] **8.2** Toast notifications for actions (saved, cleared, etc.)
- [ ] **8.3** Loading states and transitions
- [ ] **8.4** Update page metadata (title, description, favicon)
- [ ] **8.5** Improve landing page styling
- [ ] **8.6** Add subtle animations (cell transitions, button feedback)

---

## Phase 9: Stretch Features (Optional)
**Goal:** Nice-to-haves if time permits

- [ ] **9.1** Zoom in/out on grid
- [ ] **9.2** Pan/drag to move around grid
- [ ] **9.3** Generation counter display
- [ ] **9.4** Undo/redo for cell edits
- [ ] **9.5** Grid wrapping toggle (toroidal vs bounded)
- [ ] **9.6** Touch support for tablet

---

## Tech Decisions

| Concern | Decision |
|---------|----------|
| State Management | React useState/useReducer (no external lib needed) |
| Styling | Tailwind CSS v4 |
| Theme | CSS variables + context |
| Storage | localStorage |
| Rendering | CSS Grid or Canvas (decide in Phase 1) |

---

## File Structure (Proposed)

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles + theme vars
└── game/
    ├── page.tsx                # Game page
    └── _gameComponents/
        ├── Grid.tsx            # Main grid display
        ├── Sidebar.tsx         # Controls + patterns
        ├── Controls.tsx        # Play/pause, speed, etc.
        ├── PatternPicker.tsx   # Pattern selection
        ├── SaveLoadPanel.tsx   # Save/load UI
        ├── InfoModal.tsx       # Game description modal
        └── ThemeToggle.tsx     # Dark/light switch

lib/
├── gameLogic.ts               # Game of Life rules
├── patterns.ts                # Pattern definitions
├── storage.ts                 # localStorage helpers
└── types.ts                   # TypeScript types

contexts/
├── GameContext.tsx            # Game state provider
└── ThemeContext.tsx           # Theme provider
```

---

## How to Use This Roadmap

1. Work through phases in order (1 → 8)
2. Check off items as you complete them
3. Each phase builds on the previous
4. Phase 9 is optional stretch goals
5. Feel free to adjust scope as needed

**Current Status:** Phase 1 - Not Started
