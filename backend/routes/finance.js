var express = require('express');
var model = require('../app/model.js');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../conf/config.js");
var mongoose = require("mongoose");


/* GET home page. */
router.get('/add', function(req, res, next) {
    res.render('finance/add',{name:'jing'});
});

router.post('/delete', function(req, res, next) {
    var data = req.body;
    data.isDelete = 1;
    db.updateFinance(data, model.updateFinanceModel,function(err,callback) {
        if (err) {
            console.log(err);
        } else {
            console.log("update success");
            res.redirect("./list");
        }
});
});

router.post('/update', function(req, res) {
    var data = req.body;
    db.updateFinance(data, model.updateFinanceModel, function(err,callback) {
        if (err) {
            console.log(err);
        } else {
            console.log("update success");
            res.redirect("./list");
        }
});
});

router.post('/submit', function(req, res) {
    var data = req.body
    data.isDelete = 0;
    db.saveDefine(data,model.updateFinanceModel,function(err,callback){
        if(err){
            console.log("err" + err);
        } else {
            console.log("insert success");
            res.redirect('./list');
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
router.all('/list', function(req, res) {
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
    
    var content = {money:{"$gt":0},isDelete:{"$lt":1},userName:{"$in":user_list}};
    db.find(content,model.updateFinanceModel,function(err, callback){
                if (err){
                    console.log("select err" + err);
                } else {
                    res.render('finance/list',{lists:callback,selected_dong:selected_dong,selected_jing:selected_jing,display:JSON.stringify(JSON.stringify(callback))});
                }
            });
});
module.exports = router;
