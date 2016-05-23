var handlebars = require('handlebars');
var fs = require('fs');
var request = require('request');
var test = require('../data/member_today');
var giphy = require('giphy-api')();

var controller = {};
var giphyQueue = [];
var removeGiphy = false;
var rotation = 15;
var state = 0;
var myVar = setInterval(inter, rotation * 1000);

function inter() {
  state++;
  state = state % 5;
  if (removeGiphy && giphyQueue[0] !== undefined) {
    removeGiphy = false;
    console.log('removed: ' + giphyQueue[0].giphy);
    giphyQueue.shift();
  }
  //console.log(state);
}

controller.getRetrotv = function(req, res) {
  var data = {};
  if (state === 0) {
    data.sync = rotation;
    setOrder(data, res);
  } else if (state === 1) {
    data.sync = rotation;
    setCoffee(data, res);
  } else if (state === 2) {
    data.sync = rotation;
    setCoworking(data, res);
  } else if (state === 3) {
    data.sync = rotation;
    setEvents(data, res);
  } else if (state === 4) {
    data.sync = rotation;
    setGiphy(data, res);
  } else {
    return res.status(500).send({
      message: 'Old hardware do break from time to time...',
    });
  }
};

controller.postRequest = function(req, res) {
  var tmp = {};
  if (req.body === undefined) {
    console.log('body = undefined');
    return res.status(400).send({
      message: 'Try again... (better luck this time)',
    });
  }
  tmp.user = '' + req.body.user.id;
  tmp.giphy = req.body.giphy;
  giphyQueue.push(tmp);
  return res.status(200).send({
    message: 'That went well...',
  });
};

function setOrder(data, res) {
  var file = 'orders.html';
  request('http://localhost:4000/member/today', function(error, response, respBody) {
    var body = JSON.parse(respBody);
    //body = test;
    if (!error && response.statusCode === 200 && body.data !== undefined) {
      if (body.data[0] !== undefined) {
        data.name0 = body.data[0].firstName + ' ' + body.data[0].lastName;
        data.img0 = body.data[0].image;
        data.headline0 = body.data[0].headline;
        data.order0 = true;
      }
      if (body.data[1] !== undefined) {
        data.name1 = body.data[1].firstName + ' ' + body.data[1].lastName;
        data.img1 = body.data[1].image;
        data.headline1 = body.data[1].headline;
        data.order1 = true;
      }
      if (body.data[2] !== undefined) {
        data.name2 = body.data[2].firstName + ' ' + body.data[2].lastName;
        data.img2 = body.data[2].image;
        data.headline2 = body.data[2].headline;
        data.order2 = true;
      }
      if (body.data[3] !== undefined) {
        data.name3 = body.data[3].firstName + ' ' + body.data[3].lastName;
        data.img3 = body.data[3].image;
        data.headline3 = body.data[3].headline;
        data.order3 = true;
      }
      if (body.data[4] !== undefined) {
        data.name4 = body.data[4].firstName + ' ' + body.data[4].lastName;
        data.img4 = body.data[4].image;
        data.headline4 = body.data[4].headline;
        data.order4 = true;
      }
      if (body.data[5] !== undefined) {
        data.name5 = body.data[5].firstName + ' ' + body.data[5].lastName;
        data.img5 = body.data[5].image;
        data.headline5 = body.data[5].headline;
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
}

function setCoffee(data, res) {
  var file = 'coffee.html';
  request('http://localhost:4000/coffee/current', function(error, response, respBody) {
    if (!error && response.statusCode === 200 && respBody !== null) {
      var body = JSON.parse(respBody);
      data.title = body.data.title.toUpperCase();
      data.description = body.data.description.toUpperCase();
      data.img = body.data.image;
      if (body.data.averageVotes === 0) {
        data.votes = 'NO VOTES';
      } else {
        data.votes = 'SCORE: ' + body.data.averageVotes;
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
}

function setEvents(data, res) {
  var file = 'events.html';
  var d = new Date();
  var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];
  request('http://localhost:4000/events?dateFrom=' + d.toISOString(),
    function(error, response, respBody) {
    if (!error && response.statusCode === 200 && respBody !== undefined) {
      var body = JSON.parse(respBody);
      var eventNr = Math.floor(Math.random() * body.data.length);
      var da = new Date(body.data[eventNr].date);
      data.date = da.getDate();
      data.month = monthNames[da.getMonth()];
      data.title = body.data[eventNr].title;
      data.text = body.data[eventNr].text;
      if (data.text.length > 230) {
        data.text = data.text.substr(0, 230) + '...';
      }
      data.location = body.data[eventNr].location;
      data.attendants = [];
      for (var i = 0; i < body.data[eventNr].attendants.length; i++) {
        data.attendants.push(body.data[eventNr].attendants[i].image);
      }
      //console.log(data);
    }
    renderAndSend(file, data, res);
  });
}

function setCoworking(data, res) {
  var file = 'coworking.html';
  renderAndSend(file, data, res);
}

function setGiphy(data, res) {
  var file = 'giphy.html';
  if (giphyQueue[0] !== undefined) {
    console.log(giphyQueue[0]);
    request('http://localhost:4000/member?ids=' + giphyQueue[0].user,
      function(error, response, respBody) {
        if (!error && response.statusCode === 200 && respBody !== null) {
          var body = JSON.parse(respBody);
          giphy.random({
            tag: giphyQueue[0].giphy,
            rating: 'g',
            fmt: 'json',
          }, function(err, result) {
            data.imageR = false;
            if (result) {
              data.img = result.data.image_url;
              data.name = body.data[0].firstName.toUpperCase() + ' ' +
              body.data[0].lastName.toUpperCase();
              data.req = giphyQueue[0].giphy.toUpperCase();
              data.imgR = body.data[0].image;
              data.imageR = true;
            }
            renderAndSend(file, data, res);
          });
        }
      });
    removeGiphy = true;
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
    });
    var template = handlebars.compile(source);
    var html = template(data);
    res.send(html);
  });
}

module.exports = controller;
