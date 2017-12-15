var express = require('express');
var path = require('path');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var paylist = require('./routes/paylist');
var remark = require('./routes/remark');
var app = express();
var display = require('./routes/display');
var login = require('./routes/login');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
var config = require('./conf/session.conf').config
app.use(session({
    name : "sid",
    secret : 'keyboard cat',
    resave : true,
    rolling:true,
    saveUninitialized : false,
    cookie : config.cookie,
    store : new RedisStore(config.sessionStore)
}));

//app.use(session({ secret: 'keyboard cat',
  //  cookie: { maxAge: 60000 }}))
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use('*',login);
app.use('/', index);
app.use('/users', users);
app.use('/paylist', paylist);
app.use('/remark', remark);
app.use('/display', display);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
