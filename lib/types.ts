export type CellState = 0 | 1; // 0 = dead, 1 = alive

export type Grid = CellState[][];

export interface GridSize {
  rows: number;
  cols: number;
}

export interface GameConfig {
  gridSize: GridSize;
  cellSize: number; // pixels per cell
  speed: number; // ms between generations
}

export interface GameState {
  grid: Grid;
  isRunning: boolean;
  generation: number;
  config: GameConfig;
}

export interface Coordinate {
  row: number;
  col: number;
}

export const DEFAULT_CONFIG: GameConfig = {
  gridSize: { rows: 40, cols: 60 },
  cellSize: 12,
  speed: 100,
};

export const GRID_LIMITS = {
  minRows: 10,
  maxRows: 150,
  minCols: 10,
  maxCols: 200,
};
