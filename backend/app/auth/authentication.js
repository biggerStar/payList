var jwt = require('jsonwebtoken');
var users = require('./users');
module.exports = {
    login: login,
    loginFail: loginFail,
    checkUser: checkUser
}

/**
 * User Login handler. Takes email and password as post parameters, checks them and returns json
 */
function loginFail(request, response) {
    response.redirect("/login"); 
}

function login(request, response) {
    if (!request.user) {
        console.log("User is not logged in");
    } else {
        response.cookie('userid', request.user.id);
        var token = createToken(request.user.name, request.user.id);
        //response.cookie('jwt', token);
        users.saveUserToken(request.user.id.toString(), token);
    }

    if (request.user) {
        console.log("User " + request.user.id + " logged in");
        response.json({token: token});
    } else {
        response.json({error: 0x1, message: "username or password is incorrect"});
   }
}

function createToken(user_name, user_id) {
    var secret = "secret";
    var payload = {user_id: user_id, user_name: user_name};
    return jwt.sign(payload, secret, {expiresIn: '2d'});
}

/**
 * Middleware that checks if user is logged in
 */
function checkUser(request, response, next) {
    if (checkTokenAndSetUser(request)) {
        next();
    } else {
        response.sendStatus(401);
    }
}

/**
 * check token with cache, and set user to request
 */
function checkTokenAndSetUser(request) {
    try {
        let token = request && request.headers && request.headers['authorization'] || null;
        var decoded = verifyToken(token);
        if (token && decoded && decoded.user_id && users.hasToken(token, decoded.user_id)) {
            request.user = {id: decoded.user_id};
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, "secret");
    } catch (err) {
        return null;
    }
}