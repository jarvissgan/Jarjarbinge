"use strict";

class User{
    constructor(userID, username, password, firstName, lastName, address, number, email, bookmarked, userPicture){
        this.userID =  userID;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.number = number;
        this.email = email;
        this.bookmarked = bookmarked;
        this.userPicture = userPicture;
    }
    //get functions
    getUserID(){
        return this.userID;
    }
    getUserName(){
        return this.username;
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
    getUserPicture(){
        return this.userPicture;
    }

    //set functions
    setUserID(userID){
        this.userID = userID
    }
    setUserName(username){
        this.name = username
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
        //TODO: check if json can be simply x = x lol,
        //might not be so simple
        this.bookmarked = bookmarked;
    }
    setUserPicture(userPicture){
        //TODO:check if blobs can be set like this
        this.userPicture = userPicture;
    }

}
module.exports = User;