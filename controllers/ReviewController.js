"use strict";
const Review = require('../models/Review');
const ReviewDB = require('../models/ReviewDB');

var reviewDB = new ReviewDB();
var jwt = require('jsonwebtoken');

var secret = "verysecretkey"


function getAllReview(request, respond) {
    reviewDB.getAllReview(function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    });
}

function addReview(request, respond) {
    var now = new Date().toISOString().slice(0, 19).replace('T', ' '); //formats datetime to correct format : YYYY-MM-DD HH:MI:SS
    var review = new Review(null, request.body.userID, request.body.restaurantID, request.body.title, request.body.review, request.body.rating, now.toString());
    reviewDB.addReview(review, function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    })
};

function deleteReview(request, respond) {
    var reviewID = request.params.id;
    reviewDB.deleteReview(reviewID, function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    });
}

function updateReview(request, respond) {
    console.log('request.params.id: ', request.params.id);
    var now = new Date().toISOString().slice(0, 19).replace('T', ' '); //formats datetime to correct format : YYYY-MM-DD HH:MI:SS
    var token  = request.body.token;
    console.log('token: ', token);
    try{
        var decoded = jwt.verify(token, secret);
        console.log('decoded: ', decoded);
        var review = new Review(parseInt(request.params.id), request.body.userID, request.body.restaurantID, request.body.title, request.body.review, request.body.rating, now.toString());
        
        reviewDB.updateReview(review, function (error, result) {
            if (error) {
                respond.json(error);
            } else {
                respond.json(result);
            }
        });
    }catch{
        respond.json({
            result: "invalid token"
        });
    }
    
}

function searchNameByID(request, respond) {    
    var reviewID = request.params.reviewID;
    console.log('reviewID: ', reviewID);
    reviewDB.searchNameByID(reviewID, function (error, result) {
        if (error) {
            respond.json(error);
        } else {
            respond.json(result[0]);
        }
    });
}
module.exports = {
    getAllReview,
    addReview,
    deleteReview,
    updateReview,
    searchNameByID
};