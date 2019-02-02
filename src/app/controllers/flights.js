const {Flight} = require('../../../DBmodels/Flights');



exports.GetALLFlights = function(req, res, next)
{
  Flight.find()
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

exports.GetFlight = function(req, res, next)
{
  console.log("Flight");
  console.log(req.body.Source);
  console.log(req.body.Destination);

  Flight.find({ $and: [ { Source: { '$regex' : req.body.Source } },{ Destination: { '$regex' : req.body.Destination } }, { Class: req.body.Class } ] })
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


exports.PostFlights = function(req, res, next){
  let flight = new Flight({
    Name: req.body.Name,
    Price: req.body.Price,
    Class: req.body.Class,
    Source: req.body.Source,
    Destination: req.body.Destination,
    TotalSeats: req.body.TotalSeats,
    AvailableSeats: req.body.AvailableSeats,
    Date: req.body.Date,
    Time: req.body.Time,
    Image: req.body.Image,
  });

  flight.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

exports.GetPopularFlights = function(req, res, next) {
  //query with mongoose
  //console.log(req.params.loc);

  Flight.find({"Source": { $ne: req.params.src },"Class": req.params.class}).limit(4)
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
