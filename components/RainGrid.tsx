import React, { useState, useEffect, useCallback } from 'react';
import RainDrop from './RainDrop';

interface RainGridProps {
  width: number;
  height: number;
  isPlaying: boolean;
}

const RainGrid: React.FC<RainGridProps> = ({ width, height, isPlaying }) => {
  const [grid, setGrid] = useState<Array<Array<{ color: string; speed: number } | null>>>([]);

  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];

  const initializeGrid = useCallback(() => {
    const newGrid = Array(height).fill(null).map(() => 
      Array(width).fill(null).map(() => 
        Math.random() < 0.3 ? {
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.floor(Math.random() * 100) + 50,
        } : null
      )
    );
    setGrid(newGrid);
  }, [width, height]);

  useEffect(() => {
    initializeGrid();
  }, [width, height, initializeGrid]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        if (!prevGrid.length) return prevGrid;

        const newGrid = prevGrid.map(row => [...row]);
        
        // Move existing drops down
        for (let y = height - 1; y > 0; y--) {
          for (let x = 0; x < width; x++) {
            newGrid[y][x] = newGrid[y - 1][x];
          }
        }

        // Add new drops at the top
        for (let x = 0; x < width; x++) {
          if (Math.random() < 0.3) {
            newGrid[0][x] = {
              color: colors[Math.floor(Math.random() * colors.length)],
              speed: Math.floor(Math.random() * 100) + 50,
            };
          } else {
            newGrid[0][x] = null;
          }
        }

        return newGrid;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [width, height, isPlaying, colors]);

  if (!grid.length) return null;

  return (
    <div className="rain-grid" style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}>
      {grid.flat().map((cell, index) => (
        <div key={index} className="rain-cell">
          {cell && <RainDrop color={cell.color} speed={cell.speed} />}
        </div>
      ))}
    </div>
  );
};

export default RainGrid;

