"use strict";

class Restaurant{
    constructor(restaurantID, name, description, address, cuisine, price, image, email, number){
        this.restaurantID = restaurantID; this.name = name; this.description = description; this.address = address; this.cuisine = cuisine; this.price = price; this.image = image; this.email = email; this.number = number;
    }
    getRestaurantID(){
        return this.restaurantID;
    }
    getRestaurantName(){
        return this.name;
    }
    getRestaurantDescription(){
        return this.description;
    }
    getRestaurantAddress(){
        return this.address;
    }
    getRestaurantCuisine(){
        return this.cuisine;
    }
    getRestaurantPrice(){
        return this.price;
    }
    getRestaurantImage(){
        return this.image;
    }
    getRestaurantEmail(){
        return this.email;
    }
    getRestaurantNumber(){
        return this.number;
    }
    
    setRestaurantID(restaurantID){
        this.restaurantID = restaurantID;
    }
    setRestaurantName(name){
        this.name = name;
    }
    setRestaurantDescription(description){
        this.description = description;
    }
    setRestaurantAddress(address){
        this.address = address;
    }
    setRestaurantCuisine(cuisine){
        this.cuisine = cuisine;
    }
    setRestaurantPrice(price){
        this.price = price;
    }
    setRestaurantImage(image){
    //TODO: check how to store blobs
    this.image = image;
    }
    setRestaurantEmail(email){
        this.email = email;
    }
    setRestaurantNumber(number){
        this.number = number;
    }

}
module.exports = Restaurant;