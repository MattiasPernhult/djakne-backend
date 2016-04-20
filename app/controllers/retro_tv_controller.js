var handlebars = require('handlebars');
var fs = require('fs');
var request = require('request');
var test = require('../data/member_today');
var giphy = require('giphy-api')();

var controller = {};
var giphyQueue = [];

controller.getRetrotv = function(req, res) {
  var data = {};
  var body = {};
  var d = new Date();
  var n = d.getSeconds();
  var file = '';
  if (n >= 0 && n < 15) {
    file = 'orders.html';
    data.sync = 15 - n;
    request('http://localhost:4000/member/today', function(error, response, respBody) {
      body = JSON.parse(respBody);
      body = test;
      if (!error && response.statusCode === 200) {
        if (body.members[0] !== undefined) {
          data.name0 = body.members[0].firstName + ' ' + body.members[0].lastName;
          data.img0 = body.members[0].image;
          data.headline0 = body.members[0].headline;
          data.order0 = true;
        }
        if (body.members[1] !== undefined) {
          data.name1 = body.members[1].firstName + ' ' + body.members[1].lastName;
          data.img1 = body.members[1].image;
          data.headline1 = body.members[1].headline;
          data.order1 = true;
        }
        if (body.members[2] !== undefined) {
          data.name2 = body.members[2].firstName + ' ' + body.members[2].lastName;
          data.img2 = body.members[2].image;
          data.headline2 = body.members[2].headline;
          data.order2 = true;
        }
        if (body.members[3] !== undefined) {
          data.name3 = body.members[3].firstName + ' ' + body.members[3].lastName;
          data.img3 = body.members[3].image;
          data.headline3 = body.members[3].headline;
          data.order3 = true;
        }
        if (body.members[4] !== undefined) {
          data.name4 = body.members[4].firstName + ' ' + body.members[4].lastName;
          data.img4 = body.members[4].image;
          data.headline4 = body.members[4].headline;
          data.order4 = true;
        }
        if (body.members[5] !== undefined) {
          data.name5 = body.members[5].firstName + ' ' + body.members[5].lastName;
          data.img5 = body.members[5].image;
          data.headline5 = body.members[5].headline;
          data.order5 = true;
        }
      } else if (response.statusCode === 400) {

      } else {
        return res.status(500).send({
          message: 'Ohh... database is having some stomach problems, ' +
            'maybe to much coffee for one day...',
        });
      }
      renderAndSend(file, data, res);
    });
  } else if (n >= 15 && n < 35) {
    file = 'coffee.html';
    request('http://localhost:4000/coffee/current', function(error, response, respBody) {
      if (!error && response.statusCode === 200 && respBody !== null) {
        body = JSON.parse(respBody);
        data.title = body.result.title.toUpperCase();
        data.description = body.result.description.toUpperCase();
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

    if (giphyQueue[0] !== undefined) {
      request('http://localhost:4000/member?ids=' + giphyQueue[0].user,
        function(error, response, respBody) {
        if (!error && response.statusCode === 200 && respBody !== null) {
          body = JSON.parse(respBody);
          giphy.random({
            tag: giphyQueue[0].giphy,
            rating: 'g',
            fmt: 'json',
          }, function(err, result) {
            data.imageR = false;
            if (result) {
              data.img = result.data.image_url;
              data.name = body.data.members[0].firstName.toUpperCase() + ' ' +
              body.data.members[0].lastName.toUpperCase();
              data.req = giphyQueue[0].giphy.toUpperCase();
              data.imgR = body.data.members[0].image;
              data.imageR = true;
            }
            giphyQueue.shift();
            renderAndSend(file, data, res);
          });
        }
      });
    } else {
      giphy.random({
        tag: '8bit, retro',
        rating: 'g',
        fmt: 'json',
      }, function(err, result) {
        data.image = false;
        if (result) {
          data.img = result.data.image_url;
          data.image = true;
        }
        renderAndSend(file, data, res);
      });
    }
  } else {
    return res.status(500).send({
      message: 'Old hardware do break from time to time...',
    });
  }
};

controller.postRequest = function(req, res) {
  var tmp = {};
  if(req.body === undefined) {
    console.log('body = undefined');
    return res.status(400).send({
      message: 'Try again... (better luck this time)',
    });
  }
  tmp.user = req.body.userID;
  tmp.giphy = req.body.giphy;
  giphyQueue.push(tmp);
  return res.status(200).send({
    message: 'That went well...',
  });
}

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
