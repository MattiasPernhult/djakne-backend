var express = require('express');
var server = express();
var http = require('http');
var  httpServer = http.Server(server);

var controller = {};

controller.getRetrotv = function(req, res) {

  var d = new Date();
  var n = d.getSeconds();
  var file = '';
  if (n >= 0 && n < 25) {
    file = 'orders.html';
  } else if (n >= 25 && n < 35) {
    file = 'coffee.html';
  } else if (n >= 35 && n < 50){
    file = 'coworking.html';
  } else if (n >= 50 && n < 60) {
    file = 'giphy.html';
  } else {
    return res.status(500).send({
      message: 'Old hardware do break from time to time...',
    });
  }
  res.sendFile('app/views/' + file, { root: '.' });
};

module.exports = controller;
