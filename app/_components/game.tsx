'use client'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

type Player = {
  id: string;
  position: { x: number, y: number };
};

const Game = () => {
  const [socket, setSocket] = useState<any>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myPosition, setMyPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('updatePosition', (player) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.filter(p => p.id !== player.id);
        return [...updatedPlayers, player];
      });
    });

    socket.on('playerLeft', (id: string) => {
      setPlayers((prevPlayers) => prevPlayers.filter(p => p.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle player movement with arrow keys
  const handleKeyDown = (e: KeyboardEvent) => {
    const newPosition = { ...myPosition };

    if (e.key === 'ArrowUp') newPosition.y -= 10;
    if (e.key === 'ArrowDown') newPosition.y += 10;
    if (e.key === 'ArrowLeft') newPosition.x -= 10;
    if (e.key === 'ArrowRight') newPosition.x += 10;

    setMyPosition(newPosition);

    if (socket) {
      socket.emit('playerMove', newPosition);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [myPosition]);

  return (
    <div>
      <div>
        <div style={{ position: 'absolute', top: myPosition.y, left: myPosition.x, width: '20px', height: '20px', backgroundColor: 'red' }} />
        {players.map(player => (
          <div
            key={player.id}
            style={{ position: 'absolute', top: player.position.y, left: player.position.x, width: '20px', height: '20px', backgroundColor: 'blue' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
