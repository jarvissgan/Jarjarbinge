"use strict";
const RestaurantDB = require('../models/RestaurantDB');
const Restaurant = require('../models/Restaurant');

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
function addRestaurant(request, respond){
    var restaurant = new Restaurant(null, request.body.name, request.body.description, request.body.address, request.body.cuisine, request.body.price, request.body.imageBlob, request.body.email, request.body.number);
    restaurantDB.addRestaurant(restaurant, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    })
};
function deleteRestaurant(request, respond){
    var RestaurantID = request.params.id;
    restaurantDB.deleteRestaurant(RestaurantID, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}
function updateRestaurant(request, respond){
    var restaurant = new Restaurant(parseInt(request.params.id), request.body.name, request.body.description, request.body.address, request.body.cuisine, request.body.price, request.body.imageBlob, request.body.email, request.body.number);
    restaurantDB.updateRestaurant(restaurant, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}
module.exports = {getAllRestaurant, addRestaurant, deleteRestaurant, updateRestaurant};