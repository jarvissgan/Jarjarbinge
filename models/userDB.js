"use strict";

var db = require('../db-connections');

class UserDB {
    getAllUser(callback) {
        var sql = "SELECT * FROM jarjarbinge.user";
        db.query(sql, callback)
    }
    addUser(user, callback) {
        var sql = "INSERT INTO user (username, password, firstName, lastName, address, number, email, bookmarked, userPicture) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql, [user.getUserName(), user.getUserPassword(), user.getFirstName(), user.getLastName(), user.getUserAddress(), user.getUserNumber(), user.getUserEmail(), user.getUserBookmark(), user.getUserPicture()], callback);
    }
    deleteUser(user, callback) {
        var sql = "DELETE from user WHERE userID = ?";
        return db.query(sql, [user], callback);
    }
    updateUser(user, callback) {
        var sql = "UPDATE user SET password = ?, firstName = ?, lastName = ?, address = ?, number = ?, email = ?, bookmarked = ?, userPicture = ? WHERE username = ?";
        return db.query(sql, [user.getUserPassword(), user.getFirstName(), user.getLastName(), user.getUserAddress(), user.getUserNumber(), user.getUserEmail(), user.getUserBookmark(), user.getUserPicture(), user.getUserName()], callback);
    }

    //gets specific user
    getUser(username, callback) {
        var sql = "SELECT DISTINCT userID, username, firstName, lastName, address, number, email, userPicture from user where username = ?";
        return db.query(sql, [username], callback);
    }

    //checks if user exists
    loginUser(username, callback) {
        var sql = "SELECT password FROM jarjarbinge.user WHERE username = ?";
        db.query(sql, [username], callback);
        // db.query(sql, [username], (error, result)=>{
        //     if(error){
        //         callback(JSON.stringify(error));
        //         console.log('error: ', error);
        //     }else{
        //         callback(JSON.stringify(result));
        //         console.log('result userDB: ', result);
        //     }
            
        // });
    }

}
module.exports = UserDB;