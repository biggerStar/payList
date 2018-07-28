'use strict';
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    userName: String,
    financeName: String,
    money: Number,
    startTime: String,
    endTime: String,
    type:String,
    comment:String,
    isDelete: String,
    gain: String,
    financeName: String,
    bank: String
});

const FinanceList = mongoose.model('finances', schema);

module.exports = FinanceList;