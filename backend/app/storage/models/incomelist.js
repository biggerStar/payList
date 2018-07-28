'use strict';
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    userName: String,
    money: Number,
    time: String,
    type:String,
    comment:String
});

const Incomelist = mongoose.model('incomes', schema);

module.exports = Incomelist;