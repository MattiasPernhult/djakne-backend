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
    object.averageVotes = (object.one + object.two +
      object.three + object.four +
      object.five) / object.totalVotes;
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
    resultFromDB = getAverageVotesArray(JSON.parse(JSON.stringify(resultFromDB)));
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

controller.getID = function(req, res) {
  var query = {};
  console.log(req.params.id);
  if (req.params.length > 0) {
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

var dateToIsValid = function(dateFrom, dateTo) {
    return new Date(dateTo).getDate() > new Date(dateFrom).getDate();
  };

module.exports = controller;
