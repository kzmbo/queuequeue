const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other actions here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Models
const User = require('./models/User');

// Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
