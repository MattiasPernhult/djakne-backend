var express = require('express');
var server = express();
var http = require('http');
var httpServer = http.Server(server);
var handlebars = require('handlebars');
var fs = require('fs');
var mongoService = require('../services/mongo_coffee_service');
var mysqlService = require('../services/mysql_service');
var helper = require('../utils/helper');
var request = require('request');

var controller = {};

controller.getRetrotv = function(req, res) {
  var data = {};
  var d = new Date();
  var n = d.getSeconds();
  var file = '';
  if (n >= 0 && n < 15) {
    file = 'orders.html';
    request('http://localhost:4000/member/today', function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode === 200) {
        console.log(body);

      } else if (response.statusCode === 400) {

      } else {
        return res.status(500).send({
          message: 'Ohh... database is having some stomach problems, ' +
            'maybe to much coffee for one day...',
        });
      }
    });
    renderAndSend(file, data, res);
  } else if (n >= 15 && n < 35) {
    file = 'coffee.html';
    request('http://localhost:4000/coffee/current', function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode === 200) {
        console.log(body.result.title);
        data.title = body.result.title;
        data.description = body.result.description;
        data.img = body.result.image;
        if (body.result.averageVotes === 0) {
          data.votes = 'NO VOTES';
        } else {
          data.votes = 'SCORE: ' + body.result.averageVotes;
        }
      } else if (response.statusCode === 400) {
        data.title = 'NO COFFEE ADDED';
      } else {
        return res.status(500).send({
          message: 'Ohh... database is having some stomach problems, ' +
            'maybe to much coffee for one day...',
        });
      }
      renderAndSend(file, data, res);
    });
  } else if (n >= 35 && n < 50) {
    file = 'coworking.html';
    renderAndSend(file, data, res);
  } else if (n >= 50 && n < 60) {
    file = 'giphy.html';
    renderAndSend(file, data, res);
  } else {
    return res.status(500).send({
      message: 'Old hardware do break from time to time...',
    });
  }
};

function renderAndSend(file, data, res) {
  fs.readFile('app/views/' + file, 'utf-8', function(error, source) {
    handlebars.registerHelper('custom_title', function(title) {
      var words = title.split(' ');
      for (var i = 0; i < words.length; i++) {
        if (words[i].length > 4) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
      }
      title = words.join(' ');
      return title;
    })
    var template = handlebars.compile(source);
    var html = template(data);
    res.send(html);
  });
}

module.exports = controller;
