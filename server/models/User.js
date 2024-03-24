const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  roomsJoined: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  }],
});

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
