var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');


var listSchema =new  mongoose.Schema({
    userName: String,
    money: Number,
    time: String,
    type:String,
    comment:String
});

var remarkSchema =new  mongoose.Schema({
    userName: String,
    comment: String,
    type: String,
    time:String
});
function save(data, config, callback){
    console.log("insert data");
    // connection
    var db = mongoose.createConnection(config.host);
    // model or class
    var listModel = db.model(config.table, listSchema);
    // instance
    var content = {comment:data.comment,userName:data.userName,money:data.money,type:data.type,time:data.time};
    var insertData = new listModel(content);
    insertData.save(function(err,result){
        if(err){
            console.log(err);
        }else{
            callback(null, true);
            console.log('成功插入数据');
        }
        db.close();
    });
}

function saveRemark(data, config, callback){
    console.log("insert data");
    // connection
    var db = mongoose.createConnection(config.host);
    // model or class
    var remarkModel = db.model(config.table, remarkSchema);
    // instance
    var content = {comment:data.comment,userName:data.userName,type:data.type,time:data.time};
    var insertData = new remarkModel(content);
    insertData.save(function(err,result){
        if(err){
            console.log(err);
        }else{
            callback(null, true);
            console.log('成功插入数据');
        }
        db.close();
    });
}
function find(content, config, callback) {
    var db = mongoose.createConnection(config.host);
    var listMode = db.model(config.table, listSchema);
    listMode.find(content,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log("find :" + result);
            callback(null,result);
        }
        db.close();
        });
}

function update(data, config) {
}
function deleteData(data, config){
}

module.exports.save = save;
module.exports.update = update;
module.exports.deleteData = deleteData;
module.exports.find = find;
module.exports.saveRemark = saveRemark;
