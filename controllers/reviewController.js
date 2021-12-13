"use strict";
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
module.exports = {getAllReview};