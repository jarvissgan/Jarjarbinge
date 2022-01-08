"use strict";
const User = require('../models/User');
const UserDB = require('../models/UserDB');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "verysecretkey"
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
    var user = new User(null, request.body.username, request.body.password = bcrypt.hashSync(request.body.password, 10), request.body.firstName,request.body.lastName, request.body.address, request.body.number, request.body.email, request.body.bookmarked,request.body.userPicture);
    
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
    var token = request.body.token;
    var user = new User(parseInt(request.params.id), request.body.username, request.body.password = bcrypt.hashSync(request.body.password, 10), request.body.firstName,request.body.lastName, request.body.address, request.body.number, request.body.email, request.body.bookmarked,request.body.userPicture);
    try {
        //checks if token is valid
        var decoded = jwt.verify(token, secret);
        userDB.updateUser(user, function(error, result){
            if(error){
                respond.json(error);
            }else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"invalid token"});
    }

    
}

function loginUser(request, respond){
    var username = request.body.username
    var password = request.body.password
    userDB.loginUser(username, function(error, result){
        if(error){
            respond.json(error);
        }else{
            //console.log(result[0]);
            const hash = result[0].password;
            //compares encrypted password with clear text
            // if same, flag == true
            var flag = bcrypt.compareSync(password, hash);
            if(flag){
                //creates token if password is valid
                var token = jwt.sign(username,secret);
                respond.json({result:token});
            } else{
                respond.json({result:"invalid"});

            }
        }
    })
};
module.exports = {getAllUser, addUser, deleteUser, updateUser, loginUser};