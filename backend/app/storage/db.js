const UserCredential = require('./models/userCredential');
var mongoose = require("mongoose");
const Paylist = require('./models/paylist')
const Incomelist = require('./models/incomelist')
const FinanceList = require('./models/finance')
module.exports = {
    checkPassword: checkPassword,
    getPaylist: getPaylist,
    insertPaylist: insertPaylist,
    getIncomelist: getIncomeList,
    insertIncomelist: insertIncomeList,
    getFinanceList: getFinanceList,
    insertFinancelist: insertFinancelist,
    updateFinancelist: updateFinancelist,
    removeFinanceList: removeFinanceList,
    init: init
}
var settings;

function init(_settings) {
    settings = _settings;
    if (!settings.dbpath) {
        settings.dbpath = 'mongodb://localhost/admin';
    }
    mongoose.Promise = global.Promise;
    var connectPromise = mongoose.connect(settings.dbpath);
    return connectPromise;
}

function checkPassword(username, password, hashFunc) {
    return UserCredential.findOne({username}).exec().then(
        (user) => {
            const salt = user && user.salt;
            const passwordHash = hashFunc(username, password, salt);
            if (user && passwordHash == user.passwordHash) {
                return user;
            } else {
                return null;
            }
        }
    );
}

function getPaylist() {
    return Paylist.find({money:{$gt:0}}).exec().then(
        (list) => {
            if (list) {
                return list;
            } else {
                return null;
            }
        }
    )
}

function insertPaylist(list) {
    return Paylist.create(list);
}

function getIncomeList() {
    return Incomelist.find({money:{$gt:0}}).exec().then(
        (list) => {
            if (list) {
                return list;
            } else {
                return null;
            }
        }
    )
}

function insertIncomeList(list) {
    return Incomelist.create(list);
}

function getFinanceList() {
    return FinanceList.find({money:{$gt:0}}).exec().then(
        (list) => {
            if (list) {
                return list;
            } else {
                return null;
            }
        }
    )
}

function insertFinancelist(list) {
    return FinanceList.create(list);
}

function updateFinancelist(id, list) {
    var objectId = mongoose.Types.ObjectId(id)
    return FinanceList.update({_id: objectId}, list).exec();
}

function removeFinanceList(id) {
    return FinanceList.remove({"_id": id}).exec();
}