var express = require('express');
var server = express();
var http = require('http');
var httpServer = http.Server(server);
var handlebars = require('handlebars');
var fs = require('fs');
var mongoService = require('../services/mongo_coffee_service')

var controller = {};

controller.getRetrotv = function(req, res) {
  var data = {};
  var d = new Date();
  var n = d.getSeconds();
  var file = '';
  if (n >= 0 && n < 15) {
    file = 'orders.html';
    renderAndSend(file, data, res);
  } else if (n >= 15 && n < 35) {
    file = 'coffee.html';
    mongoService.getCoffeeOneCurrent({startDate: -1,}, function(err, resultFromDB) {
      if (err) {
        console.log(err);
      }
      if (resultFromDB) {
        resultFromDB = modifyJSON(JSON.parse(JSON.stringify(resultFromDB)));
      }
      data.title = resultFromDB.title;
      data.description = resultFromDB.description;
      data.img = resultFromDB.image;
      data.votes = resultFromDB.averageVotes;
      if (data.votes === 0) {
        data.votes = 'NO VOTES';
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

function modifyJSON(object) {
  object.averageVotes = 0;
  object.totalVotes = 0;
  object.totalVotes = object.one + object.two +
    object.three + object.four + object.five;
  if (object.totalVotes > 0) {
    object.averageVotes = ((object.one + (object.two * 2) +
      (object.three * 3) + (object.four * 4) +
      (object.five * 5)) / object.totalVotes).toFixed(1);
  }
  delete object._id;
  delete object.__v;
  return object;
}

module.exports = controller;
