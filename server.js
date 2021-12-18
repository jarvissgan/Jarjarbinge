var express = require("express");

var reviewController = require('./controllers/ReviewController');
var restaurantController = require('./controllers/RestaurantController');
var userController = require('./controllers/UserController');

var app = express();

app.use(express.static("./public"));
app.use(express.json());

app.route('/review').get(reviewController.getAllReview);
app.route('/restaurant').get(restaurantController.getAllRestaurant);

app.route('/user').get(userController.getAllUser);
app.route('/user').post(userController.addUser);
app.route('/user/:id').delete(userController.deleteUser);
app.route('/user/:id').put(userController.updateUser);

app.listen(8080, () => console.log("web server ring @ http://127.0.0.1:8080"))