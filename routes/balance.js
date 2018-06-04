var express = require('express');
var model = require('../app/model.js');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../conf/config.js");
var mongoose = require("mongoose");
var listSchema1 =new  mongoose.Schema({
    userName: String,
    money: Number,
    time: String,
    type:String,
    comment:String
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
router.all('/list', function(req, res) {
    config.table = "income";
    var month = req.query.month
    var year = req.query.year;
    var selected_dong = req.query.dong_selected;
    var selected_jing = req.query.jing_selected;
    var user_list = [];
    if(selected_dong == null && selected_jing == null) {
        selected_dong = "true";
        selected_jing = "true";
    }
    if (selected_dong == 'true') {
        user_list.push("dong");
    }
    if (selected_jing == 'true') {
        user_list.push("jing");
    }
    
    if ( year == null) {
        month = moment().format("MM");
        year = moment().format("YYYY");
    }
        var time = year;

    var content = {money:{"$gt":0},time:{"$gte":time, "$lte":time + "1"},userName:{"$in":user_list}};
    if (year == "all") {
        content = {money:{"$gt":0},userName:{"$in":user_list}};
        year='全部'
    }
    db.find(content,model.listIncomeModel,function(err, callback){
                if (err){
                    console.log("select err" + err);
                } else {
                    //console.log(callback);
                    config.table = 'list';
                    db.find(content, model.listIncomeModel, function(err, callTime) {
                        if(err) {
                            console.log(err);
                        } else {
                            var time = getTime(callTime);
                            res.render('balance/list', {select_year: year, income:callback,pay: callTime, selected_dong:selected_dong,selected_jing:selected_jing, years:["2017","2018"],display_income:JSON.stringify(JSON.stringify(callback)),display_paylist:JSON.stringify(JSON.stringify(callTime))});
                        }
                    });
                }
            });
});
module.exports = router;
