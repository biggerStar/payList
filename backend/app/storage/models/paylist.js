'use strict';
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    userName: String,
    money: Number,
    time: String,
    type:String,
    comment:String
});

const Paylist = mongoose.model('lists', schema);


module.exports = Paylist;