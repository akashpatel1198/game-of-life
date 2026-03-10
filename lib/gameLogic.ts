import { Grid, GridSize, CellState } from './types';

export function createEmptyGrid(size: GridSize): Grid {
  return Array.from({ length: size.rows }, () =>
    Array.from({ length: size.cols }, () => 0 as CellState)
  );
}

export function createRandomGrid(size: GridSize, density: number = 0.3): Grid {
  return Array.from({ length: size.rows }, () =>
    Array.from({ length: size.cols }, () =>
      (Math.random() < density ? 1 : 0) as CellState
    )
  );
}

export function toggleCell(grid: Grid, row: number, col: number): Grid {
  const newGrid = grid.map((r) => [...r]);
  newGrid[row][col] = grid[row][col] === 1 ? 0 : 1;
  return newGrid;
}

export function setCell(grid: Grid, row: number, col: number, state: CellState): Grid {
  if (grid[row][col] === state) return grid;
  const newGrid = grid.map((r) => [...r]);
  newGrid[row][col] = state;
  return newGrid;
}

function countNeighbors(grid: Grid, row: number, col: number): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        count += grid[newRow][newCol];
      }
    }
  }

  return count;
}

export function computeNextGeneration(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;

  return grid.map((rowArr, row) =>
    rowArr.map((cell, col) => {
      const neighbors = countNeighbors(grid, row, col);

      // Conway's rules:
      // 1. Live cell with 2-3 neighbors survives
      // 2. Dead cell with exactly 3 neighbors becomes alive
      // 3. All other cells die or stay dead
      if (cell === 1) {
        return (neighbors === 2 || neighbors === 3 ? 1 : 0) as CellState;
      } else {
        return (neighbors === 3 ? 1 : 0) as CellState;
      }
    })
  );
}
