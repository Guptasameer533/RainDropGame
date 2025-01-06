import React from 'react';

interface RainDropProps {
  color: string;
  opacity: number;
}

const RainDrop: React.FC<RainDropProps> = ({ color, opacity }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color,
        opacity,
      }}
    ></div>
  );
};

export default RainDrop;
