
var LRU = require("lru-cache");
var cacheOfTokens ;
var option;

/**
 * settings.tokenNum: the maximum number of tokens
 * settings.maxAge: the validity of token, eg:"1000 * 60 * 60 * 24 * 2"
 * @param settings
 */
function init(settings){
    option = { max:  10, maxAge: 1000 * 60 * 60 * 24 * 2};
    cacheOfTokens = LRU(option);
}

/**
 * rlu-cache:{token:userId}
 * @returns {*}
 */
function getCacheOfTokens(){
    return cacheOfTokens;
}


module.exports = {
    init: init,
    getCacheOfTokens: getCacheOfTokens
}
