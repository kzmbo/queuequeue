const mongoose = require('mongoose');

// Define the session schema
const sessionSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  playlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Session model based on the session schema
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
