"use strict";

var db = require('../db-connections');
class UserDB{
    getAllUser(callback){
        var sql = "SELECT * FROM jarjarbinge.user";
        db.query(sql, callback)
    }
    addUser(user, callback){
        var sql = "INSERT INTO user (username, password, firstName, lastName, address, number, email, bookmarked, userPicture) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql, [user.getUserName(), user.getUserPassword(), user.getFirstName(), user.getLastName(), user.getUserAddress(), user.getUserNumber(), user.getUserEmail(), user.getUserBookmark(),user.getUserPicture()], callback);
    }
    deleteUser(user, callback){
        var sql = "DELETE from user WHERE userID = ?";
        return db.query(sql, [user], callback);
    }
    updateUser(user, callback){
        var sql = "UPDATE user SET username = ?, password = ?, firstName = ?, lastName = ?, address = ?, number = ?, email = ?, bookmarked = ?, userPicture = ? WHERE userID = ?";
        return db.query(sql, [user.getUserName(), user.getUserPassword(), user.getFirstName(), user.getLastName(), user.getUserAddress(), user.getUserNumber(), user.getUserEmail(), user.getUserBookmark(),user.getUserPicture(), user.getUserID()], callback);
    }
}
module.exports = UserDB;