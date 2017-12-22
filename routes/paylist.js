var express = require('express');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../conf/config.js");
var mongoose = require("mongoose");
var listSchema =new  mongoose.Schema({
    userName: String,
    money: Number,
    time: String,
    type:String,
    comment:String
});
/* GET home page. */
router.get('/add', function(req, res, next) {
    res.render('paylist/add',{name:'jing'});
});

router.post('/submit', function(req, res) {
    var data = req.body
    data.time = moment().format("YYYY-MM-DD HH:mm:ss");
    // console.log(req.body);
    config.table = 'list';
    db.save(data,config,function(err,callback){
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

router.all('/list', function(req, res) {
    config.table = "list";
    var month = req.query.month
    var year = req.query.year;
    var content={};
    if (month == null || year == null) {
        month = moment().format("MM");
        year = moment().format("YYYY");
    }
    var search_time = year + "-" + month;
    content = {money:{"$gt":0},time:new RegExp("^"+search_time)};
    db.find(content,config,listSchema,function(err, callback){
                if (err){
                    console.log("select err" + err);
                } else {
                    db.find({money:{"$gt":0}},config,listSchema,function(err, callTime) {
                        if(err) {
                            console.log(err);
                        } else {
                            var time = getTime(callTime);
                            console.log(JSON.stringify(JSON.stringify(callback)));
                            res.render('paylist/list', {lists:callback,years:time.years,months:time.months,select_year:year,select_month:month,display:JSON.stringify(JSON.stringify(callback))});
                        }
                    });
                }
            });
});

function getTime(obj){
    var year = new Set();
    var month = new Set();
    obj.forEach(function(data) {
        var time = data.time;
        year.add(time.split("-")[0]);
        month.add(time.split("-")[1]);
    });
    return {years:year,months:month}

}
router.post('/list', function(req, res) {
    config.table = "list";

    var month = req.query.month
    var year = req.query.year;
    if (month == null || year == null) {
        month = moment().format("MM");
        year = moment().format("YYYY");
    }
    var time = year + "-" + month;
    var content = {money:{"$gt":0},time:{"$gte":time}};
    db.find(content, config,listSchema,function(err, callback){
                if (err){
                    console.log("select err" + err);
                } else {
                    
                     var time = getTime(callback);
                     console.log(time);
                    res.render('paylist/list', {lists:callback,years:time.years,months:time.months});
                }
            });
});
module.exports = router;
