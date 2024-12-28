import React, { useEffect, useState } from 'react';

interface RainDropProps {
  color: string;
  speed: number;
}

const RainDrop: React.FC<RainDropProps> = ({ color, speed }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setOpacity((prevOpacity) => {
        if (prevOpacity >= 1) {
          clearInterval(animationInterval);
          return 0;
        }
        return prevOpacity + 0.1;
      });
    }, speed);

    return () => clearInterval(animationInterval);
  }, [speed]);

  return (
    <div
      className="rain-drop"
      style={{
        backgroundColor: color,
        opacity,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  );
};

export default RainDrop;

