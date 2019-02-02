let express = require('express');
let router = express.Router();
let {mongoose} = require('../DBmodels/mongoose');
let {Todo} = require('../DBmodels/todo');

const hotel = require('../src/app/controllers/hotel');
const restaurant = require('../src/app/controllers/restaurant');
const User = require('../src/app/controllers/User');
const Flight = require('../src/app/controllers/flights');
const Review = require('../src/app/controllers/review');
const Road = require('../src/app/controllers/road');
const Business = require('../src/app/controllers/Business');

/* GET home page. */
router.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});



router.get('/hotels/all', hotel.GetALLHotels);
router.post('/hotels', hotel.GetHotels);
router.post('/hotelsID', hotel.GetHotelsById);
router.get('/hotels/:loc/:rating', hotel.GetRecommendedHotels);
router.get('/hotels/:loc/:rating/:type', hotel.GetPopularHotels);
router.post('/postHotels', hotel.PostHotels);

router.post('/signUp', User.CreateUser);
router.post('/FbSignUp', User.FbUser);
router.post('/signIn', User.AccessToUser);

router.get('/restaurants/all', restaurant.GetALLRestaurants);
router.post('/restaurants', restaurant.GetRestaurants);
router.get('/restaurants/:loc/:rating', restaurant.GetRecommendedRestaurants);
router.get('/restaurants/:loc/:rating/:type', restaurant.GetPopularRestaurants);
router.post('/postRestaurants', restaurant.PostRestaurants);


router.get('/flights/all', Flight.GetALLFlights);
router.post('/flights', Flight.GetFlight);
router.get('/flights/:src/:class/:type', Flight.GetPopularFlights);
router.post('/postFlights', Flight.PostFlights);

router.post('/reviews', Review.GetReviews);
router.post('/postReview', Review.PostReviews);


router.get('/roads/all', Road.GetALLRoads);
router.post('/roads', Road.GetRoad);
router.get('/roads/:src', Road.GetPopularRoads);
router.post('/postRoads', Road.PostRoad);


router.post('/business', Business.GetBusiness);
router.get('/businessOptions', Business.GetBusinessOptions);
router.post('/postBusiness', Business.PostBusiness);
router.post('/updateBusiness', Business.UpdateBusiness);


module.exports = router;
