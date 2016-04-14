var express = require('express');
var server = express();
var http = require('http');
var  httpServer = http.Server(server);

var controller = {};

controller.getRetrotv = function(req, res) {

  


  console.log('New get retrotv');
  res.sendFile('app/views/orders.html', { root: '.' });
};

module.exports = controller;
