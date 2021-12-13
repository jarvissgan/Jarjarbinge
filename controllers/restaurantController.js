"use strict";
const RestaurantDB = require('../models/RestaurantDB');

var restaurantDB = new RestaurantDB();

function getAllRestaurant(request, respond){
    restaurantDB.getAllRestaurant(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
module.exports = {getAllRestaurant};