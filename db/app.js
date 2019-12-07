var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// New Code
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('mongodb+srv://sabrina-button:YOtesTSYyMfkfq7n@hackeddb-3nbl6.azure.mongodb.net/test?retryWrites=true&w=majority');
// db.then(() =>{
//   console.log("connection success");
// }).catch((e)=>{
//   console.error("Error !",e);
// });

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sabrina-button:<password>@hackeddb-3nbl6.azure.mongodb.net/test?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true });
db.connect(err => {
  const collection = db.db("db").collection("usercollection");
   console.log("Connection success. Retrieved Collection.");
   // perform actions on the collection object
  db.close();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
