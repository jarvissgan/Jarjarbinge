"use strict";

var db = require('../db-connections');
class ReviewDB{
    getAllReview(callback){
        var sql = "SELECT * FROM jarjarbinge.review";
        db.query(sql, callback)
    }
    addReview(review, callback){
        var sql = "INSERT INTO review (userID, restaurantID, title, review, rating, submissionDate) VALUES (?,?,?,?,?,?)";
        db.query(sql, [review.getUserID(), review.getRestaurantID(), review.getTitle(), review.getReview(), review.getRating(), review.getSubmissionDate()], callback);
    }
    deleteReview(review, callback){
        var sql = "DELETE from review WHERE reviewID = ?";
        return db.query(sql, [review], callback);
    }
    updateReview(review, callback){
        var sql = "UPDATE review SET title = ?, review = ?, rating = ?, submissionDate = ? WHERE reviewID = ?";
        return db.query(sql, [review.getTitle(), review.getReview(), review.getRating(), review.getSubmissionDate(), review.getReviewID()], callback);
    }
    searchNameByID(reviewID, callback){
        var sql = "SELECT username FROM jarjarbinge.user WHERE userID = ?";
        return db.query(sql, [reviewID] ,callback)
    }
}
module.exports = ReviewDB;