var express = require('express');
var router = express.Router();
/* GET home page. */
var config = require("./../conf/config.js");
var db = require("./../app/db.js");

router.get('/', function(req, res, next) {
    config.table = "remark";
    console.log("remark select");
    var content = {};
    db.find(content, config,function(err,callback){
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
    console.log(data);
});
module.exports = router;
