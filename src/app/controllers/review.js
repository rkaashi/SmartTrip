const {Review} = require('../../../DBmodels/Review');

exports.GetReviews = function (req, res, next) {
  //console.log("Reviews");

  Review.find({Object_id: req.body.Object_id})
    .exec(function (err, msg) {
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

exports.PostReviews = function (req, res, next) {
  console.log(req.body.User_id);
  console.log(req.body.Object_id);
  console.log(req.body.Rating);
  console.log(req.body.Title);
  console.log(req.body.Description);
  console.log(req.body.Date);


  let review = new Review({
    User_id: req.body.User_id,
    Object_id: req.body.Object_id,
    Rating: req.body.Rating,
    Title: req.body.Title,
    Description: req.body.Description,
    Date: req.body.Date
  });

  review.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};
