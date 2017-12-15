var express = require('express');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
 var db = require("./../app/db.js");
 var config = require("./../conf/config.js");


router.get('/', function(req, res){
    res.render('display');
});
module.exports = router;
