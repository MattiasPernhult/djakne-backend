// npm packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// project packages
var index = require('./app/routes/index');
var eventRoute = require('./app/routes/event');
var coffeeRoute = require('./app/routes/coffee');
var menuRoute = require('./app/routes/menu');
var conferenceRoute = require('./app/routes/conference');
var memberRoute = require('./app/routes/member');
var auth = require('./app/config/auth');

// connect to mongodb
mongoose.connect(auth.mongoConnection);

mongoose.connection.on('connected', function() {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', function(err) {
  console.log('Error when connecting to MongoDB: ' + err);
  process.exit(0);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('MongoDB connection disconnected through app termination');
    process.exit(0);
  });
});

// variables
var app = express();

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use('/', index);
app.use('/coffee', coffeeRoute);
app.use('/events', eventRoute);
app.use('/menu', menuRoute);
app.use('/member', memberRoute);
app.use('/conference', conferenceRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


app.set('port', 4000);
app.listen(app.get('port'), function() {
  console.log('Server is listening on port 4000..');
});

module.exports = app;
