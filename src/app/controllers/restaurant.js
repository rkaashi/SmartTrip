
const {Restaurant} = require('../../../DBmodels/Restaurant');


exports.GetALLRestaurants = function(req, res, next)
{
  Restaurant.find()
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
}

exports.GetRestaurants = function(req, res, next)
{
  console.log("Restaurants");
  console.log(req.body.Name);

  Restaurant.find({  $and : [
      { $or: [ { Name: { '$regex' : req.body.Name } }, { Location: req.body.Name }] },
      { Type: req.body.Type }
    ] })
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
}


exports.GetRecommendedRestaurants = function(req, res, next) {
  //query with mongoose
  //console.log(req.params.loc);

  Restaurant.find({"Location": req.params.loc,"Rating": req.params.rating}).limit(3)
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
};

exports.PostRestaurants = function(req, res, next){
  let restaurant = new Restaurant({
    Name: req.body.Name,
    ImpThings: req.body.ImpThings,
    Rating: req.body.Rating,
    Location: req.body.Location,
    Type: req.body.Type,
    Image: req.body.Image
  });

  restaurant.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

exports.GetPopularRestaurants = function(req, res, next) {
  //query with mongoose
  console.log(req.params.loc);

  Restaurant.find({"Location": { $ne: req.params.loc },"Rating": req.params.rating}).limit(3)
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
};
