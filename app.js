'use strict'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var nodemon = express();

// view engine setup
nodemon.set('views', path.join(__dirname, 'views'));
nodemon.set('view engine', 'ejs');
// to set template file extension to .html 
//nodemon.set('view engine', 'html');
//nodemon.engine('html', require('ejs').__express);

nodemon.use(logger('dev'));
nodemon.use(express.json());
nodemon.use(express.urlencoded({ extended: false }));
nodemon.use(cookieParser());
nodemon.use(express.static(path.join(__dirname, 'public')));

nodemon.use('/', indexRouter);

// catch 404 and forward to error handler
nodemon.use(function(req, res, next) {
  next(createError(404));
});

// error handler
nodemon.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = nodemon;
