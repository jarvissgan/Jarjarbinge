var express = require("express");

var reviewController = require('./controllers/reviewController');
var restaurantController = require('./controllers/restaurantController');

var app = express();

app.use(express.static("./public"));
app.use(express.json());

app.route('/review').get(reviewController.getAllReview);
app.route('/restaurant').get(restaurantController.getAllRestaurant);

app.listen(8080, () => console.log("web server ring @ http://127.0.0.1:8080"))