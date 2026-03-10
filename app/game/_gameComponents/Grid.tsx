'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useGame } from '@/contexts/GameContext';

export default function Grid() {
  const { state, toggleCell, setCell } = useGame();
  const { grid, config } = state;
  const { cellSize } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<0 | 1>(1); // 1 = drawing alive, 0 = erasing

  const width = grid[0].length * cellSize;
  const height = grid.length * cellSize;

  // Draw the grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // Draw cells
    ctx.fillStyle = '#4ade80';
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

    // Draw grid lines
    ctx.strokeStyle = '#2d2d44';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, [grid, cellSize, width, height]);

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

      // Determine draw mode based on current cell state
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
