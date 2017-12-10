var express = require('express');
var express = require('express');
var moment = require('moment');
var router = express.Router();
var pay = require('./../app/paylist.js');
var qs = require("querystring");
var db = require("./../app/db.js");
var config = require("./../config.js");

router.post('/submit', function(req,res){
    var data = req.body;
    data.time = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log( data);
    config.table='remark';
    db.saveRemark(data, config, function(err, call){
        if(err){
            console.log("err" + err);
        } else {
            console.log("insert success");
            var content = {};
            res.render('paylist/ok')
        }
});
});
module.exports = router;
