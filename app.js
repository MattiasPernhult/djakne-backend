// npm packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// project packages
var index = require('./app/routes/index');
var coffeeRoute = require('./app/routes/coffee');
var auth = require('./app/config/auth');
// Ändra denna
mongoose.connect(auth.mongoConnection);

// variables
var app = express();

app.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use(bodyParser.json());

app.use('/', index);
app.use('/coffee', coffeeRoute);

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

app.set('port', 3000);
app.listen(app.get('port'));

console.log('Server is listening on port 3000..');

module.exports = app;
