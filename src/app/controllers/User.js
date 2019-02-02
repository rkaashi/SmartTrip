const {User} = require('../../../DBmodels/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.CreateUser = function (req, res, next) {
  // console.log(req.body.Name);
  // console.log(req.body.Phone);
  // console.log(req.body.Email);
  // console.log(req.body.Address);
  // console.log(req.body.City);
  // console.log(req.body.State);
  // console.log(bcrypt.hashSync(req.body.Password, 10));
  // console.log(req.body.Gender);
  // console.log(req.body.Age);
  // console.log(req.body.BusinessUser);

  let user = new User({
    Name: req.body.Name,
    Phone: req.body.Phone,
    Email: req.body.Email,
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    Password: bcrypt.hashSync(req.body.Password, 10),
    Gender: req.body.Gender,
    Age: req.body.Age,
    BusinessUser: req.body.BusinessUser,
    _id: null
  });

  if (req.body.ID!==undefined){
    console.log('ID' + req.body.ID);

  }

  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });

};



exports.AccessToUser = function (req, res, next) {
  console.log(req.body.Email);
  console.log(req.body.Password);
  User.findOne({Email: req.body.Email}, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      console.log('Usernot found');
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.Password, user.Password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    let token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id,
      BusinessUser: user.BusinessUser
    });
  });

};


exports.FbUser = function (req, res, next) {

  let user = new User({
    Name: req.body.Name,
    Phone: req.body.Phone,
    Email: req.body.Email,
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    Password: bcrypt.hashSync(req.body.Password, 10),
    Gender: req.body.Gender,
    Age: req.body.Age,
    BusinessUser: req.body.BusinessUser,
    _id: req.body.ID
  });

  if (req.body.ID!==undefined){
    console.log('ID' + req.body.ID);

  }

  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });

};
