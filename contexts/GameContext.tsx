'use client';

import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { Grid, GameState, GameConfig, DEFAULT_CONFIG, Coordinate } from '@/lib/types';
import { createEmptyGrid, createRandomGrid, toggleCell, setCell, computeNextGeneration } from '@/lib/gameLogic';

type GameAction =
  | { type: 'TOGGLE_CELL'; row: number; col: number }
  | { type: 'SET_CELL'; row: number; col: number; state: 0 | 1 }
  | { type: 'SET_GRID'; grid: Grid }
  | { type: 'CLEAR_GRID' }
  | { type: 'RANDOMIZE_GRID' }
  | { type: 'NEXT_GENERATION' }
  | { type: 'SET_RUNNING'; isRunning: boolean }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'SET_GRID_SIZE'; rows: number; cols: number }
  | { type: 'SET_CELL_SIZE'; cellSize: number };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TOGGLE_CELL':
      return {
        ...state,
        grid: toggleCell(state.grid, action.row, action.col),
      };

    case 'SET_CELL':
      return {
        ...state,
        grid: setCell(state.grid, action.row, action.col, action.state),
      };

    case 'SET_GRID':
      return {
        ...state,
        grid: action.grid,
        generation: 0,
      };

    case 'CLEAR_GRID':
      return {
        ...state,
        grid: createEmptyGrid(state.config.gridSize),
        generation: 0,
        isRunning: false,
      };

    case 'RANDOMIZE_GRID':
      return {
        ...state,
        grid: createRandomGrid(state.config.gridSize),
        generation: 0,
      };

    case 'NEXT_GENERATION':
      return {
        ...state,
        grid: computeNextGeneration(state.grid),
        generation: state.generation + 1,
      };

    case 'SET_RUNNING':
      return {
        ...state,
        isRunning: action.isRunning,
      };

    case 'SET_SPEED':
      return {
        ...state,
        config: { ...state.config, speed: action.speed },
      };

    case 'SET_GRID_SIZE': {
      const newSize = { rows: action.rows, cols: action.cols };
      return {
        ...state,
        config: { ...state.config, gridSize: newSize },
        grid: createEmptyGrid(newSize),
        generation: 0,
        isRunning: false,
      };
    }

    case 'SET_CELL_SIZE':
      return {
        ...state,
        config: { ...state.config, cellSize: action.cellSize },
      };

    default:
      return state;
  }
}

function createInitialState(config: GameConfig = DEFAULT_CONFIG): GameState {
  return {
    grid: createEmptyGrid(config.gridSize),
    isRunning: false,
    generation: 0,
    config,
  };
}

interface GameContextValue {
  state: GameState;
  toggleCell: (row: number, col: number) => void;
  setCell: (row: number, col: number, cellState: 0 | 1) => void;
  clearGrid: () => void;
  randomizeGrid: () => void;
  nextGeneration: () => void;
  play: () => void;
  pause: () => void;
  toggleRunning: () => void;
  setSpeed: (speed: number) => void;
  setGridSize: (rows: number, cols: number) => void;
  setCellSize: (cellSize: number) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, DEFAULT_CONFIG, createInitialState);
  const animationRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const nextGeneration = useCallback(() => {
    dispatch({ type: 'NEXT_GENERATION' });
  }, []);

  const play = useCallback(() => {
    dispatch({ type: 'SET_RUNNING', isRunning: true });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'SET_RUNNING', isRunning: false });
  }, []);

  const toggleRunning = useCallback(() => {
    dispatch({ type: 'SET_RUNNING', isRunning: !state.isRunning });
  }, [state.isRunning]);

  // Game loop
  useEffect(() => {
    if (!state.isRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= state.config.speed) {
        dispatch({ type: 'NEXT_GENERATION' });
        lastUpdateRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state.isRunning, state.config.speed]);

  const value: GameContextValue = {
    state,
    toggleCell: (row, col) => dispatch({ type: 'TOGGLE_CELL', row, col }),
    setCell: (row, col, cellState) => dispatch({ type: 'SET_CELL', row, col, state: cellState }),
    clearGrid: () => dispatch({ type: 'CLEAR_GRID' }),
    randomizeGrid: () => dispatch({ type: 'RANDOMIZE_GRID' }),
    nextGeneration,
    play,
    pause,
    toggleRunning,
    setSpeed: (speed) => dispatch({ type: 'SET_SPEED', speed }),
    setGridSize: (rows, cols) => dispatch({ type: 'SET_GRID_SIZE', rows, cols }),
    setCellSize: (cellSize) => dispatch({ type: 'SET_CELL_SIZE', cellSize }),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
