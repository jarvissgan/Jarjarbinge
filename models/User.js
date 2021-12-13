"use strict";

class User{
    constructor(userID, name, password, firstName, lastName, address, number, email, bookmarked){
        this.userID; this.name; this.password; this.firstName; this.lastName, this.address, this.number, this.email, this.bookmarked;
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