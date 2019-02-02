let mongoose = require('mongoose');

let Restaurant = mongoose.model('restaurant', {
  Name: {
    type: String,
    required: true
  },
  ImpThings: {
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
  Type: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  }
});

module.exports = {Restaurant};
