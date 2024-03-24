const mongoose = require('mongoose');

// Define the music schema
const musicSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  albumArtUrl: {
    type: String,
    required: true
  },
  spotifyPreviewUrl: {
    type: String,
    required: true
  }
});

// Create a Music model based on the music schema
const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
