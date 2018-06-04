var express = require('express');
var model = require('../app/model.js');
var router = express.Router();
/* GET home page. */
var config = require("./../conf/config.js");
var db = require("./../app/db.js");
var mongoose = require("mongoose");
 var listSchema =new  mongoose.Schema({
      userName: String,
      money: Number,
      time: String,
      type:String,
      comment:String
  });
router.get('/', function(req, res, next) {
    console.log("remark select");
    var content = {};
    db.find(content, model.listRemarkModel,function(err,callback){
        if (err) {
            console.log("select err" + err);
        } else {
            console.log("result:" + callback);
            res.render('index', {remarks:callback});
        }
    });
});
router.get('/logout',function(req,res){
    req.session.destroy();
    res.render('login');
});
router.post('/submit', function(req,res){
    var data=req.body;
});
module.exports = router;
