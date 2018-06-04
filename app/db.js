var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');
mongoose.createConnection("127.0.0.1:27017");

function updateFinance(data, model, callback){
    console.log("update finance")
    model.update({_id:data._id},{$set:data},function(err){
        if(err){
            console.log(err);
        } else {
            callback(null,true)
        }
    });
}

function save(data, listModel, callback){
    console.log("insert data");
    // connection
    // instance
    var content = {comment:data.comment,userName:data.userName,money:data.money,type:data.type,time:data.time,picture:data.picture};
    var insertData = new listModel(content);
    insertData.save(function(err,result){
        if(err){
            console.log(err);
        }else{
            callback(null, true);
            console.log('成功插入数据');
        }
    //    mongoose.close();
    });
}

function saveDefine(data, listModel, callback){
    console.log("insert data");
    // connection
    var insertData = new listModel(data);
    insertData.save(function(err,result){
        if(err){
            console.log(err);
        }else{
            callback(null, true);
            console.log('成功插入数据');
        }
     //   mongoose.close();
    });
}
function saveRemark(data, config, callback){
    console.log("insert data");
    // connection
    var db = mongoose.createConnection(config.host);
    // model or class
    var remarkModel = mongoose.model(config.table, remarkSchema);
    // instance
    var content = {comment:data.comment,userName:data.userName,type:data.type,time:data.time,picture:data.picture};
    var insertData = new remarkModel(content);
    insertData.save(function(err,result){
        if(err){
            console.log(err);
        }else{
            callback(null, true);
            console.log('成功插入数据');
        }
      //  mongoose.close();
    });
}
function removeRemark(data,config,callback){
    console.log("remove remark");
    var db = mongoose.createConnection(config.host);
    var remarkModel = db.model(config.table, remarkSchema);
//    var content = {comment:data.comment};
    remarkModel.remove(data,function(err,result){
        if(err){
            console.log(err);
         }else{
            console.log("update");
             callback(null, true);
        }
    //    mongoose.close();
    });
}

function find(content, listModel ,callback) {
    var sort={time:-1}
    listModel.find(content,'-__v',{sort:{time:-1}},function(err,result){
        if(err){
            console.log(err);
        }else{
            callback(null,result);
        }
    });
}

function findSomeTable(content,schema,config,callback){
    console.log('connection')
    var db = mongoose.connect(config.host);
    var mode = mongoose.model(config.table,schema);
    mode.findOne(content, function(err, result){
        if(err){
            console.log(err);
        } else{
            callback(null,result);
        }
      //  mongoose.disconnect();
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
module.exports.removeRemark=removeRemark;
module.exports.findSomeTable= findSomeTable;
module.exports.saveDefine= saveDefine;
module.exports.updateFinance = updateFinance;
