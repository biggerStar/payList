var express = require('express');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../config.js");

/* GET home page. */
router.get('/add', function(req, res, next) {
    res.render('paylist/add',{name:'jing'});
});

router.post('/submit', function(req, res) {
    var data = req.body
    data.time = moment().format("YYYY-MM-DD HH:mm:ss");
    // console.log(req.body);
    config.table = 'list';
    db.save(req.body,config,function(err,callback){
        if(err){
            console.log("err" + err);
        } else {
            console.log("insert success");
            res.render('paylist/ok');
        }
    });
    //var list = pay.select({});
    //console.dir("result:" + list);
    //res.render('paylist/list', {lists:list});


});

router.get('/list', function(req, res) {
    config.table = "list";
    db.find(config,function(err, callback){
                if (err){
                    console.log("select err" + err);
                } else {
                    console.log("result:" + callback);
                    res.render('paylist/list', {lists:callback});
                }
            });
});
module.exports = router;
