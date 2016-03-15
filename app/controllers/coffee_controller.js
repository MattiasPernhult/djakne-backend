var mongoService = require('../services/mongo_coffee_service');
/**var CoffeModel = require('../models/coffe_model');**/
var uuid = require('node-uuid');
var controller = {};

controller.post = function(req, res) {

  console.log('I coffee_controller/ post');
  /**  var coffeeToAdd = createCoffeModel(req);**/
  var coffeeToAdd = {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.date,
    stopDate: req.body.date,
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

function getAverageVotes(query) {
  var objects = query;
  for (var i = 0; i < objects.length; i++) {
    objects[i].averageVotes = 0;
    if (objects[i].totalVotes > 0) {
      objects[i].averageVotes = (objects[i].one + objects[i].two +
        objects[i].three + objects[i].four +
        objects[i].five) / objects[i].totalVotes;
    }
  }
  return objects;
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
    resultFromDB = getAverageVotes(JSON.parse(JSON.stringify(resultFromDB)));
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

controller.getID = function(req, res) {
  console.log('req.params');
  var query = {};
  console.log('HELLO');
  console.log(req.params.id);
  console.log(req.params['id']);
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
    query = buildQueryID(req);
  }
  mongoService.getCoffeeOne(query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
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
    djakneID: req.params['id'],
  };
  return query;
};

var buildQueryCurrent = function(req) {
  var query = {
    date: {},
  };
  if (req.query.dateFrom !== undefined) {
    query.date.$gte = new Date(req.query.dateFrom);
  }
  if (req.query.dateTo !== undefined) {
    if (dateToIsValid) {
      query.date.$lt = new Date(req.query.dateTo);
    }
  }
  return query;
};

var dateToIsValid = function(dateFrom, dateTo) {
  return new Date(dateTo).getDate() > new Date(dateFrom).getDate();
};
/**var createCoffeModel= function(req) {
  var body = req.body;
  var coffeeToAdd = new CoffeModel(body.title, body.text, body.date)
}**/
module.exports = controller;
