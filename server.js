const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit fake crowd data every 2 seconds
  setInterval(() => {
    const fakeUser = {
      id: Math.floor(Math.random() * 1000),
      lat: 51.5 + (Math.random() - 0.5) * 0.01,  // near London
      lng: -0.12 + (Math.random() - 0.5) * 0.01
    };
    socket.emit('crowdData', fakeUser);
  }, 2000);
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
