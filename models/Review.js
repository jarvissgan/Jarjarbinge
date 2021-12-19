"use strict";

class Review{
    constructor(reviewID, userID, restaurantID, title, review, rating, submissionDate){
        this.reviewID = reviewID; this.userID = userID; this.restaurantID = restaurantID; this.title = title; this.review = review; this.rating = rating; this.submissionDate = submissionDate;
    }
    getReviewID(){
        return this.reviewID;
    }
    getUserID(){
        return this.userID;
    }
    getRestaurantID(){
        return this.restaurantID;
    }
    getTitle(){
        return this.title;
    }
    getReview(){
        return this.review;
    }
    getRating(){
        return this.rating;
    }
    getSubmissionDate(){
        return this.submissionDate;
    }
    setReviewID(reviewID){
        this.reviewID = reviewID;
    }
    setUserID(userID){
        this.userID = userID;
    }
    setRestaurantID(restaurantID){
        this.restaurantID = restaurantID;
    }
    setTitle(title){
        this.title = title;
    }
    setReview(review){
        this.review = review;
    }
    setRating(rating){
        this.rating = rating;
    }
    setSubmissionDate(submissionDate){
        this.submissionDate = submissionDate;
    }

}
module.exports = Review;