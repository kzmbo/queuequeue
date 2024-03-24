const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 4000;

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');


    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
