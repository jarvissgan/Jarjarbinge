var express = require("express");
const cors = require('cors');
var multer = require('multer')
multer({ limits: { fieldSize: 2 * 1024 * 1024 }})
const upload = multer({ dest: '/assets', limits:{ fieldSize: 10000000000 }  }) //um cause i want to upload gif

var app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

var reviewController = require('./controllers/ReviewController');
var restaurantController = require('./controllers/RestaurantController');
var userController = require('./controllers/UserController');

app.route('/restaurant').get(restaurantController.getAllRestaurant);
//app.route('/restaurant').post(restaurantController.addRestaurant);
app.post("/restaurant", upload.any(), restaurantController.addRestaurant);

app.route('/restaurant/:id').delete(restaurantController.deleteRestaurant);
app.route('/restaurant/:id').put(restaurantController.updateRestaurant);

app.route('/review').get(reviewController.getAllReview);
app.route('/review').post(reviewController.addReview);
app.route('/review/:reviewID').get(reviewController.searchNameByID);

app.route('/review/:id').delete(reviewController.deleteReview);

app.put("/review/:id", upload.any(), reviewController.updateReview);
//app.route('/review/:id').put(reviewController.updateReview);

app.route('/user').get(userController.getAllUser);
// app.route('/user').post(userController.addUser);

//using multer to upload files
app.post("/user", upload.any(), userController.addUser);

app.route('/user/:id').delete(userController.deleteUser);

//app.route('/user').put(userController.updateUser);
app.put("/user", upload.any(), userController.updateUser);

app.route('/user/get/:token').get(userController.getUser);

app.route('/login/:username&:password').get(userController.loginUser);


app.listen(8080, () => console.log("web server ring @ http://127.0.0.1:8080"))