"use strict";

var db = require('../db-connections');
class UserDB{
    getAllUser(callback){
        var sql = "SELECT * FROM jarjarbinge.user";
        db.query(sql, callback)
    }
}
module.exports = UserDB;