'use client';
import React from 'react';
import RainGrid from './RainGrid';

const Game: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <RainGrid width={20} height={15} isPlaying={true} speed={197} />
    </div>
  );
};

export default Game;
