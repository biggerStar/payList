var cache = require('./cache')

module.exports = {
    saveUserToken: saveUserToken,
    hasToken: hasToken,
    clearUserToken: clearUserToken,
};
function saveUserToken(userId, token) {
    if (!cache.getCacheOfTokens().get(token)) {
        cache.getCacheOfTokens().set(token, userId);
    }
}

function hasToken(token, userId){
    return cache.getCacheOfTokens().has(token) && cache.getCacheOfTokens().get(token) === userId;
}

function clearUserToken(userId, token) {
    var userId = cache.getCacheOfTokens().get(token);
    if (userId) {
        cache.getCacheOfTokens().del(token);
    }
}