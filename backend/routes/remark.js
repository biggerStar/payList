var express = require('express');
var express = require('express');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../conf/config.js");

router.post('/submit', function(req,res){
    var data = req.body;
    data.time = moment().format("YYYY-MM-DD");
    config.table='remark';
    db.saveRemark(data, config, function(err, call){
        if(err){
            console.log("err" + err);
        } else {
            console.log("insert success");
            var content = {};
            res.render('paylist/remarkOk')
        }
});
});

router.get('/remove',function(req,res){
    var data = req.query;
    config.table='remark';
    db.removeRemark(data,config,function(err,callback){
        if(err) {
            console.log("err");
        } else {
            console.log("revome success");
            res.render('paylist/remarkOk');
        }

});
});

module.exports = router;
