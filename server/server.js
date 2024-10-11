import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
   
    console.log('A player connected:', socket.id);

    // Listen for player movements
    socket.on('playerMove', (position) => {
      socket.broadcast.emit('updatePosition', { id: socket.id, position });
    });

    // Disconnect player
    socket.on('disconnect', () => {
      console.log('Player disconnected:', socket.id);
      socket.broadcast.emit('playerLeft', socket.id);
    });
    

  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1); 
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});