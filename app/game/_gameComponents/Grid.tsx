'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { GRID_LIMITS } from '@/lib/types';

interface GridProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Grid({ containerRef }: GridProps) {
  const { state, setCell, setGridSize } = useGame();
  const { theme } = useTheme();
  const { grid, config } = state;
  const { cellSize } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<0 | 1>(1);
  const hasAutoFit = useRef(false);

  const width = grid[0].length * cellSize;
  const height = grid.length * cellSize;

  // Auto-fit grid to container on mount
  useEffect(() => {
    if (hasAutoFit.current || !containerRef?.current) return;

    const container = containerRef.current;
    const padding = 32;
    const availableWidth = container.clientWidth - padding * 2;
    const availableHeight = container.clientHeight - padding * 2;

    const maxCols = Math.floor(availableWidth / cellSize);
    const maxRows = Math.floor(availableHeight / cellSize);

    const cols = Math.min(Math.max(maxCols, GRID_LIMITS.minCols), GRID_LIMITS.maxCols);
    const rows = Math.min(Math.max(maxRows, GRID_LIMITS.minRows), GRID_LIMITS.maxRows);

    setGridSize(rows, cols);
    hasAutoFit.current = true;
  }, [containerRef, cellSize, setGridSize]);

  // Draw the grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Read theme colors from CSS variables
      const styles = getComputedStyle(document.documentElement);
      const gridBg = styles.getPropertyValue('--theme-grid-bg').trim();
      const gridLine = styles.getPropertyValue('--theme-grid-line').trim();
      const cellAlive = styles.getPropertyValue('--theme-cell-alive').trim();

      ctx.fillStyle = gridBg;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = cellAlive;
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          if (grid[row][col] === 1) {
            ctx.fillRect(
              col * cellSize + 1,
              row * cellSize + 1,
              cellSize - 2,
              cellSize - 2
            );
          }
        }
      }

      ctx.strokeStyle = gridLine;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    // Use requestAnimationFrame to ensure CSS has updated before reading
    const frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [grid, cellSize, width, height, theme]);

  const getCellFromEvent = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): { row: number; col: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
        return { row, col };
      }
      return null;
    },
    [cellSize, grid]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const cell = getCellFromEvent(e);
      if (!cell) return;

      const currentState = grid[cell.row][cell.col];
      const newMode = currentState === 1 ? 0 : 1;
      setDrawMode(newMode as 0 | 1);
      setIsDrawing(true);

      setCell(cell.row, cell.col, newMode as 0 | 1);
    },
    [getCellFromEvent, grid, setCell]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;

      const cell = getCellFromEvent(e);
      if (!cell) return;

      setCell(cell.row, cell.col, drawMode);
    },
    [isDrawing, getCellFromEvent, setCell, drawMode]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDrawing(false);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="cursor-crosshair rounded-lg shadow-lg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
  );
}
