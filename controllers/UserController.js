"use strict";
const User = require('../models/User');
const UserDB = require('../models/UserDB');

var userDB = new UserDB();

function getAllUser(request, respond){
    userDB.getAllUser(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
function addUser(request, respond){
    var user = new User(null, request.body.username, request.body.password, request.body.firstName,request.body.lastName, request.body.address, request.body.number, request.body.email, request.body.bookmarked,request.body.userPicture);
    userDB.addUser(user, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    })
};
function deleteUser(request, respond){
    var userID = request.params.id;
    userDB.deleteUser(userID, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}
function updateUser(request, respond){
    var user = new User(parseInt(request.params.id), request.body.username, request.body.password, request.body.firstName,request.body.lastName, request.body.address, request.body.number, request.body.email, request.body.bookmarked,request.body.userPicture);
    userDB.updateUser(user, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}
module.exports = {getAllUser, addUser, deleteUser, updateUser};