var config = require("../conf/config.js");
var db = require("./db.js");
var mongo_host = config.host;
var mongo = require("mongodb");


function insert(data) {
    config.table = "list";
    return db.save(data, config);
}
function select(data) {
    config.table = "list";
     db.find(data, config);
}

module.exports.insert = insert;
module.exports.select = select;

