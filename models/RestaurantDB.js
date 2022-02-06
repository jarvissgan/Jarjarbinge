"use strict";

var db = require('../db-connections');
class RestaurantDB{
    getAllRestaurant(callback){
        var sql = "SELECT * FROM jarjarbinge.restaurant";
        db.query(sql, callback)
    }
    addRestaurant(restaurant, callback){
        var sql = "INSERT INTO restaurant (name, description, address, cuisine, price, image, email, number) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sql, [restaurant.getRestaurantName(), restaurant.getRestaurantDescription(), restaurant.getRestaurantAddress(), restaurant.getRestaurantCuisine(),
            restaurant.getRestaurantPrice(), restaurant.getRestaurantImage(), restaurant.getRestaurantEmail(), restaurant.getRestaurantNumber()], callback);
    }
    deleteRestaurant(restaurant, callback){
        var sql = "DELETE from restaurant WHERE restaurantID = ?";
        return db.query(sql, [restaurant], callback);
    }
    updateRestaurant(restaurant, callback){
        var sql = "UPDATE restaurant SET name = ?, description = ?, address = ?, cuisine = ?, price = ?, image = ?, email = ?, number = ? WHERE restaurantID = ?";
        return db.query(sql, [restaurant.getRestaurantName(), restaurant.getRestaurantDescription(), restaurant.getRestaurantAddress(), restaurant.getRestaurantCuisine(), restaurant.getRestaurantPrice(), restaurant.getRestaurantImage(), restaurant.getRestaurantEmail(), restaurant.getRestaurantNumber(), restaurant.getRestaurantID() ], callback);
    }
}
module.exports = RestaurantDB;