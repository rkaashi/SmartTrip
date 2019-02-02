let mongoose = require('mongoose');

let Road = mongoose.model('road', {
  Name: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  Price: {
    type: String,
    required: true
  },
  Source: {
    type: String,
    required: true
  },
  Destination: {
    type: String,
    required: true
  },
  TotalSeats: {
    type: Number,
    required: true
  },
  AvaiableSeats: {
    type: Number,
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  Time: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  }
});

module.exports = {Road};
