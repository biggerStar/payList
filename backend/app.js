const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const income= require('./app/api/incomelist');
const balance = require('./app/api/balance');
const finance= require('./app/api/finance');
const app = express();
const ejs = require("ejs");
const passport = require('passport');
const db = require('./app/storage/db')
const strategy = require('./app/auth/strategy')
const authenticate = require('./app/auth/authentication')
const cache = require('./app/auth/cache')
const paylist = require('./app/api/paylist')
cache.init();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine(".ejs", ejs.__express);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
var config = require('./conf/session.conf').config
// app.use(session({
//     name : "sid",
//     secret : 'keyboard cat',
//     resave : true,
//     rolling:true,
//     saveUninitialized : false,
//     cookie : config.cookie,
// //    store : new RedisStore(config.sessionStore)
// }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize())
app.use(passport.session())
// TODO: settings 
db.init({ dbpath: 'mongodb://localhost/admin'});
passport.use(strategy.local());

//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.post('/login',passport.authenticate('local'), authenticate.login);
app.get('/fail', authenticate.loginFail);
app.get('/paylist/list', authenticate.checkUser, paylist.getList);
app.post('/paylist/submit', authenticate.checkUser,paylist.submit);
app.get('/income/list', authenticate.checkUser,income.getList);
app.post('/income/submit', authenticate.checkUser,income.submit);
app.get('/finance/list', authenticate.checkUser,finance.getList);
app.post('/finance/submit', authenticate.checkUser,finance.submit);
app.put('/finance/update', authenticate.checkUser,finance.update);
app.delete('/finance/delete', authenticate.checkUser,finance.remove);
app.get('/balance/list', authenticate.checkUser,balance.getList);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
});
module.exports = app;
