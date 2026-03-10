'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { GRID_LIMITS, CellState } from '@/lib/types';

interface GridProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Grid({ containerRef }: GridProps) {
  const { state, setCell, setGridSize, selectedPattern, patternRotation, placePattern } = useGame();
  const { theme } = useTheme();
  const { grid, config } = state;
  const { cellSize } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<0 | 1>(1);
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);
  const hasAutoFit = useRef(false);

  const width = grid[0].length * cellSize;
  const height = grid.length * cellSize;

  // Get rotated pattern cells
  const getRotatedCells = useCallback((cells: CellState[][], rotation: number): CellState[][] => {
    let result = cells;
    for (let i = 0; i < rotation; i++) {
      const rows = result.length;
      const cols = result[0].length;
      const rotated: CellState[][] = [];
      for (let col = 0; col < cols; col++) {
        const newRow: CellState[] = [];
        for (let row = rows - 1; row >= 0; row--) {
          newRow.push(result[row][col]);
        }
        rotated.push(newRow);
      }
      result = rotated;
    }
    return result;
  }, []);

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
      const styles = getComputedStyle(document.documentElement);
      const gridBg = styles.getPropertyValue('--theme-grid-bg').trim();
      const gridLine = styles.getPropertyValue('--theme-grid-line').trim();
      const cellAlive = styles.getPropertyValue('--theme-cell-alive').trim();

      ctx.fillStyle = gridBg;
      ctx.fillRect(0, 0, width, height);

      // Draw alive cells
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

      // Draw pattern preview if hovering with selected pattern
      if (selectedPattern && hoverCell) {
        const patternCells = getRotatedCells(selectedPattern.cells, patternRotation);
        ctx.fillStyle = cellAlive;
        ctx.globalAlpha = 0.5;
        
        for (let r = 0; r < patternCells.length; r++) {
          for (let c = 0; c < patternCells[r].length; c++) {
            if (patternCells[r][c] === 1) {
              const targetRow = hoverCell.row + r;
              const targetCol = hoverCell.col + c;
              
              if (
                targetRow >= 0 &&
                targetRow < grid.length &&
                targetCol >= 0 &&
                targetCol < grid[0].length
              ) {
                ctx.fillRect(
                  targetCol * cellSize + 1,
                  targetRow * cellSize + 1,
                  cellSize - 2,
                  cellSize - 2
                );
              }
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      // Draw grid lines
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

    const frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [grid, cellSize, width, height, theme, selectedPattern, hoverCell, patternRotation, getRotatedCells]);

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

      // If a pattern is selected, place it
      if (selectedPattern) {
        placePattern(cell.row, cell.col);
        return;
      }

      // Otherwise, draw mode
      const currentState = grid[cell.row][cell.col];
      const newMode = currentState === 1 ? 0 : 1;
      setDrawMode(newMode as 0 | 1);
      setIsDrawing(true);

      setCell(cell.row, cell.col, newMode as 0 | 1);
    },
    [getCellFromEvent, grid, setCell, selectedPattern, placePattern]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const cell = getCellFromEvent(e);
      setHoverCell(cell);

      if (!isDrawing || selectedPattern) return;

      if (!cell) return;

      setCell(cell.row, cell.col, drawMode);
    },
    [isDrawing, getCellFromEvent, setCell, drawMode, selectedPattern]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDrawing(false);
    setHoverCell(null);
  }, []);

  return (
    <div className="min-w-fit min-h-fit m-auto">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`block rounded-lg shadow-lg ${selectedPattern ? 'cursor-copy' : 'cursor-crosshair'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
