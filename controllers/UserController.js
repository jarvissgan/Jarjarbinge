"use strict";
const User = require('../models/User');
const UserDB = require('../models/UserDB');
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
var secret = "verysecretkey"
var userDB = new UserDB();

function getAllUser(request, respond) {
    userDB.getAllUser(function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    });
}

//gets specific user
function getUser(request, respond) {
    var token = request.params.token;

    try {
        //checks if token is valid
        var decoded = jwt.verify(token, secret);

        //if token is valid, returns user information
        userDB.getUser(decoded, function (error, result) {
            if (error) {
                respond.json(error);
            } else {
                respond.json(result[0]);
            }
        });
    } catch (error) {
        respond.json({
            result: "invalid token"
        });
    }

};

function addUser(request, respond) {
    var password = bcrypt.hashSync(request.body.password, 10);

    var user = new User(null, request.body.username, password, request.body.firstName, request.body.lastName, request.body.address, request.body.number, request.body.email, request.body.bookmarked, request.body.userPicture);

    userDB.addUser(user, function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    })
};

function deleteUser(request, respond) {
    var userID = request.params.id;
    userDB.deleteUser(userID, function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    });
}

function updateUser(request, respond) {
    var token = request.body.token;

    var user = new User(parseInt(request.params.id), request.body.username, request.body.password = bcrypt.hashSync(request.body.password, 10), request.body.firstName, request.body.lastName, request.body.address, request.body.number, request.body.email, request.body.bookmarked, request.body.userPicture);
    try {
        //checks if token is valid
        var decoded = jwt.verify(token, secret);
        //if token is valid, sql will update user details
        userDB.updateUser(user, function (error, result) {
            if (error) {
                respond.json(error);
            } else {
                respond.json(result[0]);
            }
        });
    } catch (error) {
        respond.json({
            result: "invalid token"
        });
    }


}

function loginUser(request, respond) {
    //gets username and password from url
    var username = request.params.username;
    var password = request.params.password;

    userDB.loginUser(username, function (error, result) {
        //catches invalid accounts, if invalid respond.json == invalid
        try {
            if (error) {
                respond.json(error);
            } else {
                const hash = result[0].password;
                //compares encrypted password with clear text
                // if same, flag == true
                var flag = bcrypt.compareSync(password, hash);
                if (flag) {
                    var token = jwt.sign(username, secret);
                    respond.json({
                        result: token
                    });
                }else{
                    throw "invalid credentials, please try again"
                }
            }
        } catch {
            respond.json({
                result: "invalid"
            });
        }

    })
};

module.exports = {
    getAllUser,
    addUser,
    deleteUser,
    updateUser,
    loginUser,
    getUser
};