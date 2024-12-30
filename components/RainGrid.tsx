import React, { useState, useEffect, useCallback } from 'react';
import RainDrop from './RainDrop';

interface RainGridProps {
  width: number;
  height: number;
  isPlaying: boolean;
  speed: number; // New prop for speed
}

const RainGrid: React.FC<RainGridProps> = ({ width, height, isPlaying, speed }) => {
  const [grid, setGrid] = useState<Array<Array<{ color: string; opacity: number } | null>>>([]);
  const [currentColor, setCurrentColor] = useState('#ff00ff');
  const [colorChangeCounter, setColorChangeCounter] = useState(0);

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
    const newGrid = Array(height).fill(null).map(() => 
      Array(width).fill(null)
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
        const newGrid = prevGrid.map(row => [...row]);

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

        // Add new drops at the top with controlled density
        for (let x = 0; x < width; x++) {
          if (Math.random() < 0.05) { // Very low probability for sparse appearance
            for (let i = 0; i < blockLength; i++) {
              const opacity = (i / blockLength); // Gradual fade-out effect
              if (i < height) {
                newGrid[i][x] = {
                  color: currentColor,
                  opacity
                };
              }
            }
          } else {
            newGrid[0][x] = null;
          }
        }

        return newGrid;
      });

      setColorChangeCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        if (newCounter >= 10) {
          setCurrentColor(getRandomColor());
          return 0;
        }
        return newCounter;
      });
    }, speed); // Use the speed prop to control interval

    return () => clearInterval(interval);
  }, [width, height, isPlaying, currentColor, speed]);

  if (!grid.length) return null;

  return (
    <div 
      className="grid bg-black" 
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gap: '1px',
        padding: '1px',
        background: 'rgba(128, 128, 128, 0.2)',
      }}
    >
      {grid.flat().map((cell, index) => (
        <div 
          key={index} 
          className="aspect-square bg-black"
        >
          {cell && <RainDrop color={cell.color} opacity={cell.opacity} />}
        </div>
      ))}
    </div>
  );
};

export default RainGrid;
