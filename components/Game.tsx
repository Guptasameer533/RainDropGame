'use client'
import React, { useState } from 'react';
import RainGrid from './RainGrid';

const Game: React.FC = () => {
  const [gridSize, setGridSize] = useState({ width: 15, height: 20 });
  const [isPlaying, setIsPlaying] = useState(true);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleResize = (dimension: 'width' | 'height', value: number) => {
    setGridSize((prev) => ({ ...prev, [dimension]: value }));
  };

  return (
    <div className="game-container">
      <div className="game-content">
        <h1 className="game-title">Raindrop Fall</h1>
        <div className="game-layout">
          <div className="grid-container">
            <RainGrid width={gridSize.width} height={gridSize.height} isPlaying={isPlaying} />
          </div>
          <div className="controls-container">
            <div className="control-group">
              <label className="control-label">Grid Width: {gridSize.width}</label>
              <input
                type="range"
                min="5"
                max="30"
                value={gridSize.width}
                onChange={(e) => handleResize('width', parseInt(e.target.value))}
                className="control-slider"
              />
            </div>
            <div className="control-group">
              <label className="control-label">Grid Height: {gridSize.height}</label>
              <input
                type="range"
                min="5"
                max="30"
                value={gridSize.height}
                onChange={(e) => handleResize('height', parseInt(e.target.value))}
                className="control-slider"
              />
            </div>
            <button
              onClick={handleTogglePlay}
              className={`control-button ${isPlaying ? 'stop' : 'start'}`}
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

