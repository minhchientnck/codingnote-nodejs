var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

var loginRouter = require('./auth/login');
var crudPostRouter = require('./admin/crud-post');
var uploadedFileRouter = require('./admin/upload-file');
var indexRouter = require('./routes/index');
var thuthuatRouter = require('./routes/thuthuat');
var javascriptRouter = require('./routes/javascript');
var databaseRouter = require('./routes/database');
var reactjsRouter = require('./routes/reactjs');
var angularRouter = require('./routes/angular');
var vuejsRouter = require('./routes/vuejs');
var javaRouter = require('./routes/java');
var springMvcRouter = require('./routes/spring-mvc');
var springBootRouter = require('./routes/spring-boot');
var pythonRouter = require('./routes/python');
var djangoRouter = require('./routes/django');
var anacondaRouter = require('./routes/anaconda');
var webpackRouter = require('./routes/webpack');
var cssRouter = require('./routes/css');
var nodejsRouter = require('./routes/nodejs');
var nginxRouter = require('./routes/nginx');
var postDetail = require('./routes/post-detail');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var maxAge = +process.env.SESSION_MAXAGE || 3600000;
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRouter);
app.use('/admin', crudPostRouter);
app.use('/admin', uploadedFileRouter);

app.use('/', indexRouter);
app.use('/javascript', javascriptRouter);
app.use('/reactjs', reactjsRouter);
app.use('/angular', angularRouter);
app.use('/vuejs', vuejsRouter);
app.use('/java', javaRouter);
app.use('/spring-mvc', springMvcRouter);
app.use('/spring-boot', springBootRouter);
app.use('/python', pythonRouter);
app.use('/django', djangoRouter);
app.use('/anaconda', anacondaRouter);
app.use('/webpack', webpackRouter);
app.use('/css', cssRouter);
app.use('/database', databaseRouter);
app.use('/thu-thuat', thuthuatRouter);
app.use('/nodejs', nodejsRouter);
app.use('/nginx', nginxRouter);
app.use('/', postDetail);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
