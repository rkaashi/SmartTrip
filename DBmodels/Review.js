let mongoose = require('mongoose');

let Review = mongoose.model('review', {
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  Object_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  Rating: {
    type: Number,
    default: 0
  },
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  }
});

module.exports = {Review};
