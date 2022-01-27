var express = require("express");
const cors = require('cors');

var app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

var reviewController = require('./controllers/ReviewController');
var restaurantController = require('./controllers/RestaurantController');
var userController = require('./controllers/UserController');

app.route('/restaurant').get(restaurantController.getAllRestaurant);
app.route('/restaurant').post(restaurantController.addRestaurant);
app.route('/restaurant/:id').delete(restaurantController.deleteRestaurant);
app.route('/restaurant/:id').put(restaurantController.updateRestaurant);


app.route('/review').get(reviewController.getAllReview);
app.route('/review').post(reviewController.addReview);
app.route('/review/:id').delete(reviewController.deleteReview);
app.route('/review/:id').put(reviewController.updateReview);

app.route('/user').get(userController.getAllUser);
app.route('/user').post(userController.addUser);
//app.post("/user", upload.single("userPicture"), userController.addUser);

app.route('/user/:id').delete(userController.deleteUser);
app.route('/user').put(userController.updateUser);
app.route('/user/get').post(userController.getUser);

app.route('/login/:username&:password').get(userController.loginUser);


app.listen(8080, () => console.log("web server ring @ http://127.0.0.1:8080"))