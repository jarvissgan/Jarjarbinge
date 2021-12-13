"use strict";

var db = require('../db-connections');
class ReviewDB{
    getAllReview(callback){
        var sql = "SELECT * FROM jarjarbinge.review";
        db.query(sql, callback)
    }
}
module.exports = ReviewDB;