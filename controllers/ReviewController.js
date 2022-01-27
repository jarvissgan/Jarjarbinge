"use strict";
const Review = require('../models/Review');
const ReviewDB = require('../models/ReviewDB');

var reviewDB = new ReviewDB();

function getAllReview(request, respond){
    reviewDB.getAllReview(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
function addReview(request, respond){
    var now = new Date().toISOString().slice(0,19).replace('T',' '); //formats datetime to correct format : YYYY-MM-DD HH:MI:SS
    var review = new Review(null, request.body.userID, request.body.restaurantID, request.body.title, request.body.review, request.body.rating, now.toString());
    reviewDB.addReview(review, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    })
};
function deleteReview(request, respond){
    var reviewID = request.params.id;
    reviewDB.deleteReview(reviewID, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}
function updateReview(request, respond){
    var now = new Date().toISOString().slice(0,19).replace('T',' '); //formats datetime to correct format : YYYY-MM-DD HH:MI:SS
    var review = new Review(parseInt(request.params.id), request.body.userID, request.body.restaurantID, request.body.title, request.body.review, request.body.rating, now.toString());
    reviewDB.updateReview(review, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}
module.exports = {getAllReview, addReview, deleteReview, updateReview};