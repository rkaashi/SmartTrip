let mongoose = require('mongoose');

let Hotel = mongoose.model('hotel', {
  Name: {
    type: String,
    required: true
  },
  Price: {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    default: 0
  },
  Location: {
    type: String,
    required: true
  },
  TotalRooms: {
    type: Number,
    default: 0
  },
  FreeRooms: {
    type: Number,
    default: 0
  },
  Image: {
    type: String,
    required: true
  }
});

module.exports = {Hotel};
