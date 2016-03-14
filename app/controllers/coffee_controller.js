var mongoService = require('../services/mongo_coffee_service');
var uuid = require('node-uuid');
var controller = {};

controller.post = function(req, res) {

  console.log('I coffee_controller/ post');
  var coffeeToAdd = {

    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    totalVotes: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    djakneID: uuid.v4(),
  };

  console.log('coffee_controller set body');

  mongoService.insertCoffee(coffeeToAdd, function(err, result) {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('Coffee To Add : ' + result.djakneID);
    res.send(result);

  });
  console.log('controller end');
};

function getAverageVotesArray(query) {
  var objects = query;
  for (var i = 0; i < objects.length; i++) {
    objects[i] = getAverageVotes(objects[i]);
  }
  return objects;
}

function getAverageVotes(object) {
  object.averageVotes = 0;
  if (object.totalVotes > 0) {
    object.averageVotes = (object.one + (object.two * 2) +
      (object.three * 3) + (object.four * 4) +
      (object.five * 5)) / object.totalVotes;
  }
  return object
}

controller.getHistory = function(req, res) {
  var query = {};
  var queryParamsExists = Object.keys(req.query).length !== 0;

  if (queryParamsExists) {
    query = buildQueryHistory(req);
  }

  mongoService.getCoffee(query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    resultFromDB = getAverageVotesArray(
      JSON.parse(JSON.stringify(resultFromDB)));
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

controller.getID = function(req, res) {
  var query = {};
  console.log(req.params.id);
  if (req.params.id.length > 0) {
    query = buildQueryID(req);
  }

  mongoService.getCoffeeOne(query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    resultFromDB = getAverageVotes(JSON.parse(JSON.stringify(resultFromDB)));
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

controller.getCurrent = function(req, res) {
  var query = {};
  var queryParamsExists = Object.keys(req.query).length !== 0;

  if (queryParamsExists) {
    query = buildQueryCurrent(req);
  }

  mongoService.getCoffeeOneCurrent(query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    resultFromDB = getAverageVotes(JSON.parse(JSON.stringify(resultFromDB[0])));
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

controller.putVote = function(req, res) {
  var query = {};
  console.log(req.params.id + ' / ' + req.params.vote);
  if (req.params.vote.length > 0 && req.params.id.length > 0) {
    query = buildQueryVote(req);
  }
  mongoService.putVote(req.params.id, query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    var response = {
      result: resultFromDB,
    };
    console.log('send result put');
    res.send(response);
  });
}

var buildQueryHistory = function(req) {
  var query = {};
  return query;
};

var buildQueryID = function(req) {
    var query = {
      djakneID: req.params.id,
    };
    return query;
  };

var buildQueryCurrent = function(req) {
    var query = {
      startDate: -1,
    };
    return query;
  };

var buildQueryVote = function(req) {
  var query = {};
  console.log('build: ' + req.params.vote);
  switch (req.params.vote) {
    case 1:
      console.log('1');
      query = { $inc: { one: 1, totalVotes: 1 }};
      break;
    case '2':
      console.log('2');
      query = { $inc: { two: 1, totalVotes: 1 }};
      break;
    case '3':
      console.log('3');
      query = { $inc: { three: 1, totalVotes: 1 }};
      break;
    case '4':
      console.log('4');
      query = { $inc: { four: 1, totalVotes: 1 }};
      break;
    case '5':
      console.log('5');
      query = { $inc: { five: 1, totalVotes: 1 }};
      break;
  }
  return query;
}

module.exports = controller;
