import app from './app.js';
import http from 'http';
import { initializeSocket } from './socket.js';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
