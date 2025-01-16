import React, { useState, useEffect, useCallback } from 'react';
import RainDrop from './RainDrop';
import './RainGrid.css'; // Import the CSS file

interface RainGridProps {
  width: number;
  height: number;
  isPlaying: boolean;
  speed: number;
}

const RainGrid: React.FC<RainGridProps> = ({ width, height, isPlaying, speed }) => {
  const [grid, setGrid] = useState<Array<Array<{ color: string; opacity: number } | null>>>([]);
  const [currentColor, setCurrentColor] = useState('#ff00ff');
  const blockLength = 6;

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const initializeGrid = useCallback(() => {
    const newGrid = Array(height).fill(null).map(() => Array(width).fill(null));
    setGrid(newGrid);
  }, [width, height]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);

        // Move existing drops down
        for (let y = height - 1; y >= 0; y--) {
          for (let x = 0; x < width; x++) {
            if (y >= blockLength) {
              newGrid[y][x] = newGrid[y - blockLength][x];
            } else {
              newGrid[y][x] = null;
            }
          }
        }

        // Add new drops at the top
        for (let x = 0; x < width; x++) {
          if (Math.random() < 0.08) {
            for (let i = 0; i < blockLength; i++) {
              if (i < height) {
                newGrid[i][x] = {
                  color: currentColor,
                  opacity: (blockLength - i) / blockLength, // Gradual fade-out
                };
              }
            }
          }
        }

        return newGrid;
      });

      setCurrentColor((prevColor) =>
        Math.random() < 0.1 ? getRandomColor() : prevColor
      );
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, width, height, currentColor, speed]);

  if (!grid.length) return null;

  // Calculate block size to fill the screen
  const blockWidth = Math.floor(window.innerWidth / width);
  const blockHeight = Math.floor(window.innerHeight / height);
  const blockSize = Math.min(blockWidth, blockHeight);

  return (
    <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${width}, ${blockSize}px)`,
      gridTemplateRows: `repeat(${height}, ${blockSize}px)`,     
      justifyContent: 'center',                                                                                                                                                     
      alignItems: 'center',                                                                                                                                                                                      
      gap: '0', // Remove gaps between blocks
      width: '100vw',
      height: '100vh',
      border: '10px solid black', // Add thick outer border
      boxSizing: 'border-box', // Ensure border is included in the element's total width and height
    }}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={index}
          className="rain-block" // Apply the CSS class
          style={{
            width: blockSize,
            height: blockSize,
            backgroundColor: cell ? cell.color : 'transparent', // No background for empty cells
            border: '2.5px solid #292828', // Borders only for visibility
            opacity: cell ? cell.opacity : 2,
          }}
        >
          {cell && <RainDrop color={cell.color} opacity={cell.opacity} />}
        </div>
      ))}
    </div>
  );
};

export default RainGrid;