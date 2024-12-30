import React from 'react';

interface RainDropProps {
  color: string;
  opacity: number;
}

const RainDrop: React.FC<RainDropProps> = ({ color, opacity }) => {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: color,
        opacity,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  );
};

export default RainDrop;

