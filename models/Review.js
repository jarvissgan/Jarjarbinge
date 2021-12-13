"use strict";

class Review{
    constructor(id, reviewID, userID, title, review, rating, submissionDate){
        this.id; this.reviewID; this.userID; this.title; this.review; this.rating; this.submissionDate;
    }
    getID(){
        return this.id;
    }
    getReviewID(){
        return this.reviewID;
    }
    getUserID(){
        return this.userID;
    }
    getTitle(){
        return this.title;
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
    setTitle(title){
        this.title = title ;
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