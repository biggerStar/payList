'use strict';
const mongoose = require('mongoose');

/**
 * Stores credentials for local login.
 * passwordHash = hash(salt + password + salt + username)
 * Currently hash function is sha512.
 */
const userSchema = new mongoose.Schema({
    id: String,
    username:  String,
    salt: String,
    passwordHash: String
});

const UserCredential = mongoose.model('users', userSchema);

module.exports = UserCredential;