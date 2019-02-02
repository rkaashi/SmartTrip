let mongoose = require('mongoose');

let Business = mongoose.model('business', {
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: undefined
  },
  Object_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Business};
