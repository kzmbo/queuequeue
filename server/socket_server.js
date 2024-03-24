const http = require('http');
const { Server } = require('socket.io');
const app = require('./express_server.js');
const mongoose = require('mongoose');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = 4000;

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Creates user when they either join or create a room
  socket.on('create-user', (data) => {
    const newUser = new User({
      username: data.username,
      roomJoined: null
    });

    newUser.save()
      .then((user) => {
        console.log('New user saved:', user);
      })
      .catch((err) => {
        console.error('Error saving user:', err);
      });
  });

  // Handle disconnection
  socket.on('disconnect', (data) => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
