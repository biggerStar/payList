var express = require('express');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../conf/config.js");
var session = require('express-session'); var RedisStore = require('connect-redis')(session);
var encrypt = require('./../app/encrypt.js');
var config = require("./../conf/config.js");
var mongoose = require('mongoose');
/*
 *
router.all('*',function(req,res,next) {
    console.log('login get');
    console.log(req.cookie);
    next();

});
*/
var userSchema = new mongoose.Schema({
    name:String,
    id:Object,
    passwd:String,
});

var Redis = require('ioredis');
//var redis = new Redis();

router.all('*', function(req, res, next) {
    console.log("login:");
    if(req.session.user){
        next();
    } else if(req.body.userName && req.body.password) {
        user=req.body.userName;
        passwd=req.body.password;
        config.table = 'user';
        db.findSomeTable({name:user},userSchema,config, function(err, callback){
            if(err){
                console.log(err);
            } else{
                console.log(callback.passwd);
                console.log(encrypt.md5(passwd));
                if (encrypt.md5(passwd) == callback.passwd) {
                    req.session.user=user;
                    next();
                } else {
                    res.render('login');
                }
            }
        });
    } else {
        res.render('login');
    }

})
module.exports = router;
