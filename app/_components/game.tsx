'use client'
import { useEffect, useState } from "react";

const Game = () => {
  const [player, setPlayer] = useState({ x: 10, y: 100 });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") setPlayer(prev => ({ ...prev, x: prev.x + 10 }));
    if (e.key === "ArrowLeft") setPlayer(prev => ({ ...prev, x: prev.x - 10 }));
    if (e.key === "ArrowUp") setPlayer(prev => ({ ...prev, y: prev.y - 10 }));
    if (e.key === "ArrowDown") setPlayer(prev => ({ ...prev, y: prev.y + 10 }));   
    
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  },[] );

  
  return (

    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'lightblue' }}>
      <div
        style={{
          position: 'absolute',
          left: `${player.x}px`,
          top: `${player.y}px`,
          width: '50px',
          height: '50px',
          backgroundColor: 'black',
        }}
      ></div>    
    </div>
    
  );
};

export default Game;