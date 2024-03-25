require("dotenv").config()
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const querystring = require('querystring')
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const server = http.createServer(app)

// Models
const User = require('./models/User');


// Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes) //Mount routes, needed so client components can make fetch calls to server side request

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other actions here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});



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

  // Join room
  socket.on('join-room', (roomName) => {
    socket.join(roomName); // Join the specified room
    console.log(`User joined room: ${roomName.roomName}`);
  });

  // Leaves a room
  socket.on('leave-room', (roomName) => {
    socket.leave(roomName); // Leave the specified room
    console.log(`User left room: ${roomName}`);
  });

  // Handle disconnection
  socket.on('disconnect', (data) => {
    console.log('User disconnected');
  });
});

const port = 3001;

// Start the server
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;
