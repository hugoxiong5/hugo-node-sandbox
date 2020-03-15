global.__rootdir = __dirname;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
var wiki = require('./routes/wiki');
var peaksayRouter = require('./routes/peaksay-routes');
var compression = require('compression');
var helmet = require('helmet');

var app = express();

app.use(helmet());

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://hugo:hugo@cluster0-kmdtl.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, 'public'))); // all Peaksay static HTML/CSS/JS files loaded from this directory

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/wiki', wiki);
app.use('/peaksay', peaksayRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/* mongoDB username and password:
---
username: hugo
password: hugo

Connection string:
mongodb+srv://hugo:<password>@cluster0-kmdtl.mongodb.net/test?retryWrites=true&w=majority

UPDATED STRING:
mongodb+srv://hugo:d2qPF6gO4ZA34qho@cluster0-kmdtl.mongodb.net/local_library?retryWrites=true&w=majority

Replace <password> with the password for the hugo user.

Full Driver Example:
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hugo:<password>@cluster0-kmdtl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/
