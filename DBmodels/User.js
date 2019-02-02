let mongoose = require('mongoose');

let User = mongoose.model('user', {
  Name: {
    type: String,
    required: false
  },
  Phone: {
    type: String,
    required: false
  },
  Email: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: false
  },
  City: {
    type: String,
    required: false
  },
  State: {
    type: String,
    required: false
  },
  Password: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: false
  },
  Age: {
    type: Number,
    required: false
   },
  BusinessUser: {
     type: String,
     required: true
   },
  _id: {
    type: String,
    default: null,
    required: false
  }
});

module.exports = {User};
