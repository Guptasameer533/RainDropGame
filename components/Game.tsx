'use client'
import React, { useState } from 'react';
import RainGrid from './RainGrid';

const Game: React.FC = () => {
  const [gridSize, setGridSize] = useState({ width: 20, height: 20 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(100); // Default speed in milliseconds

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleResize = (dimension: 'width' | 'height', value: number) => {
    setGridSize((prev) => ({ ...prev, [dimension]: value }));
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
      <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg shadow-2xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-fuchsia-400">Raindrop Fall</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-black p-2 rounded-lg shadow-inner border-solid border-2">
              <RainGrid width={gridSize.width} height={gridSize.height} isPlaying={isPlaying} speed={speed} />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium border-2">Grid Width: {gridSize.width}</label>
              <input
                type="range"
                min="5"
                max="30"
                value={gridSize.width}
                onChange={(e) => handleResize('width', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium border-2">Grid Height: {gridSize.height}</label>
              <input
                type="range"
                min="5"
                max="30"
                value={gridSize.height}
                onChange={(e) => handleResize('height', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium border-2">Speed: {speed}ms</label>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={speed}
                onChange={(e) => handleSpeedChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={handleTogglePlay}
              className={`w-full py-2 px-4 rounded font-bold transition-colors ${
                isPlaying
                  ? 'bg-fuchsia-600 hover:bg-fuchsia-700'
                  : 'bg-fuchsia-500 hover:bg-fuchsia-600'
              }`}
            >
              {isPlaying ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
