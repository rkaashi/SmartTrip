const {Business} = require('../../../DBmodels/Business');

exports.GetBusiness = function (req, res, next) {

  Business.find({User_id: req.body.User_id})
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

exports.GetBusinessOptions = function (req, res, next) {
console.log('Carry1');
  Business.find({ User_id: { $exists: false } })
    .exec(function (err, msg) {
      if (err) {
        console.log('Carry3');
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      console.log('Carry2');
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
};

exports.PostBusiness = function (req, res, next) {
  console.log(req.body.User_id);
  console.log(req.body.Object_id);


  let business = new Business({
    User_id: req.body.User_id,
    Object_id: req.body.Object_id
  });

  business.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

exports.UpdateBusiness = function (req, res, next) {

  console.log(req.body.User_id);
  console.log(req.body.Object_id);

  Business.findOneAndUpdate({Object_id: req.body.Object_id}, {$set:{User_id:req.body.User_id}}, {new: true}, function(err, msg){
    if(err){
      console.log("Something wrong when updating data!");
    }
    return res.status(200).json({
      message: 'Success',
      obj: msg
    });
  });
};
