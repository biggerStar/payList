const LocalStrategy = require('passport-local').Strategy;
const db = require('../storage/db');
const coroutine = require('bluebird').coroutine;
const crypto = require('crypto');


module.exports  = {
    local: local
};

function local() {
    return new LocalStrategy(function(username, password, done) {
        coroutine(function * Int() {
            const checkResult = yield db.checkPassword(username, password, localHashFunc);
            if (!checkResult) {
                return done(null);
            } else {
                return done(null, {id: checkResult._id.toString(), name: checkResult.username}) 
            }
        })().catch((err) => {
            done(err);
        });
    })
}

function localHashFunc(username, password, salt) {
    const hash = crypto.createHash('sha512');
    hash.update(salt + password + salt + username);
    const passwordHash = hash.digest('hex');
    return passwordHash;
}