var mongoService = require('../services/mongo_coffee_service');
var controller = {};

controller.post = function(req, res) {

  console.log('I coffee_controller/ post');
  var coffeeToAdd = {

    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    totalVotes: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  };

  console.log('coffee_controller set body');

  mongoService.insertCoffee(coffeeToAdd, function(err, result) {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('Coffee To Add : ' + result.id);
    res.send(result);

  });
  console.log('controller end');
};

<<<<<<< HEAD

=======
function getAvarageVotes(query) {
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
>>>>>>> b5585b80106292d91112b734f0c405a03bc336c4

controller.get = function(req, res) {
  var query = {};
  var queryParamsExists = Object.keys(req.query).length !== 0;

  if (queryParamsExists) {
    query = buildQuery(req);
  }

<<<<<<< HEAD
  mongoService.getCoffee(query, function(err, resultFromDB) {
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
=======
    mongoService.getCoffee(query, function(err, resultFromDB) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      resultFromDB = getAvarageVotes(JSON.parse(JSON.stringify(resultFromDB)));
      var response = {
        result: resultFromDB,
      };
      res.send(response);
    });
  };
>>>>>>> b5585b80106292d91112b734f0c405a03bc336c4

var buildQuery = function(req) {
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

module.exports = controller;
