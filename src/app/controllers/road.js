const {Road} = require('../../../DBmodels/Road');



exports.GetALLRoads = function(req, res, next)
{
  Road.find()
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

exports.GetRoad = function(req, res, next)
{
  console.log("Road");
  console.log(req.body.Source);
  console.log(req.body.Destination);

  Road.find({ $and: [ { Source: { '$regex' : req.body.Source } },{ Destination: { '$regex' : req.body.Destination } }, { Company: req.body.Company } ] })
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


exports.PostRoad = function(req, res, next){
  let road = new Road({

    Name: req.body.Name,
    Company: req.body.Company,
    Price: req.body.Price,
    Source: req.body.Source,
    Destination: req.body.Destination,
    TotalSeats: req.body.TotalSeats,
    AvaiableSeats: req.body.AvaiableSeats,
    Date: req.body.Date,
    Time: req.body.Time,
    Image: req.body.Image,
  });

  road.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

exports.GetPopularRoads = function(req, res, next) {
  //query with mongoose
  //console.log(req.params.loc);

  Road.find({"Source": { $ne: req.params.src }}).limit(4)
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
