var mongoService = require('../services/mongo_coffee_service');
var CoffeeModel = require('../models/coffee_model');
var validator = require('../utils/coffee_validator');

var controller = {};

controller.post = function(req, res) {

  var coffeeToAdd = createCoffeeModel(req);

  if (!coffeeToAdd.checkAttributes()) {
    return res.status(400).send({
      message: 'The parameters for the coffee was wrong',
    });
  }
  mongoService.insertCoffee(coffeeToAdd, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('New coffee: ' + result.djakneID);
    res.send(result);
  });
};

controller.putVote = function(req, res) {
  var query = {};
  if (!validator.validateVote(req)) {
    return res.status(400).send({
      message: 'The parameters for the vote was wrong',
    });
  }
  query = buildQueryVote(req);
  mongoService.putVote(req.body.userID, query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (resultFromDB !== null) {
      var response = {
        result: 'OK',
      };
      console.log('New vote: ' + req.body.userID);
      res.send(response);
    }else {
      var response = {
        result: 'one user = one vote!',
      };
      res.send(response);
    }
  });
};

function modifyJSONArray(query) {
  var objects = query;
  for (var i = 0; i < objects.length; i++) {
    objects[i] = modifyJSON(objects[i]);
  }
  return objects;
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
    resultFromDB = modifyJSONArray(
      JSON.parse(JSON.stringify(resultFromDB)));
    var response = {
      result: resultFromDB,
    };
    console.log('New get history');
    res.send(response);
  });
};

controller.getID = function(req, res) {
  var query = {};
  if (req.params.id.length > 0) {
    query = buildQueryID(req);
  }

  mongoService.getCoffeeOne(query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    resultFromDB = modifyJSON(JSON.parse(JSON.stringify(resultFromDB)));
    var response = {
      result: resultFromDB,
    };
    console.log('New get ID: ' + req.params.id);
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
    resultFromDB = modifyJSON(JSON.parse(JSON.stringify(resultFromDB[0])));
    var response = {
      result: resultFromDB,
    };
    console.log('New get current: ' + resultFromDB.djakneID);
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

var buildQueryVote = function(req) {
  var query = {};
  switch (req.body.vote) {
    case '1': {
      query = {
        $inc: { one: 1, }, $push: { voted: req.body.userID },
      };
      break;
    }
    case '2': {
      query = {
        $inc: { two: 1, }, $push: { voted: req.body.userID },
      };
      break;
    }
    case '3': {
      query = {
        $inc: { three: 1, }, $push: { voted: req.body.userID },
      };
      break;
    }
    case '4': {
      query = {
        $inc: { four: 1, }, $push: { voted: req.body.userID },
      };
      break;
    }
    case '5': {
      query = {
        $inc: { five: 1, }, $push: { voted: req.body.userID },
      };
      break;
    }
  }
  return query;
};


var createCoffeeModel = function(req) {
  var body = req.body;
  var coffeeToAdd = new CoffeeModel(body.title, body.description,
    body.startDate, body.endDate, body.image, body.webpage);
  return coffeeToAdd;
};

module.exports = controller;
