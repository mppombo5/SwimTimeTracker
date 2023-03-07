var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { mainModule, exit } = require('process');
const mongoose = require("mongoose");

var app = express();

// Set up Mongoose connection
mongoose.set('strictQuery', false);
const mongoDb = "mongodb://127.0.0.1:27017/swimmertest";

async function main() {
  await mongoose.connect(mongoDb);
}
main().catch(function(err) {
  console.log(err);
  exit(1);
});
console.log(`Connected to MongoDB at ${mongoDb} !`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Declare router vars
var indexRouter = require('./routes/index');
var swimmerRouter = require('./routes/swimmer');

// Register routes
app.use('/', indexRouter);
app.use('/swimmer', swimmerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
