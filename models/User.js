"use strict";

class User{
    constructor(userID, name, password, firstName, lastName, address, number, email, bookmarked){
        this.userID; this.name; this.password; this.firstName; this.lastName, this.address, this.number, this.email, this.bookmarked;
    }
    //get functions
    getUserID(){
        return this.userID;
    }
    getUserName(){
        return this.name;
    }
    getUserPassword(){
        return this.password;
    }
    getFirstName(){
        return this.firstName;
    }
    getLastName(){
        return this.lastName;
    }
    getUserAddress(){
        return this.address;
    }
    getUserNumber(){
        return this.number;
    }
    getUserEmail(){
        return this.email;
    }
    getUserBookmark(){
        return this.bookmarked;
    }

    //set functions
    setUserID(userID){
        this.userID = userID
    }
    setUserName(name){
        this.name = name
    }
    setUserPassword(password){
        this.password = password
    }
    setFirstName(firstName){
        this.firstName = firstName;
    }
    setLastName(lastName){
        this.lastName = lastName;
    }
    setUserAddress(address){
        this.address = address;
    }
    setUserNumber(number){
        this.number = number;
    }
    setUserEmail(email){
        this.email = email;
    }
    setUserBookmark(bookmarked){
        //TODO: check if blobs can be simply x = x lol,
        //might not be so simple
        this.bookmarked = bookmarked
    }

}
module.exports = Review;