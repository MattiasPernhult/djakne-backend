
var mongoService = require('../services/mongo_coffee_service');
var controller = {};

controller.post = function (req, res) {

  console.log('i coffee/ post');
  var coffeeToAdd = {

    title: req.body.title,
    description: req.body.description,
    totalVotes: req.body.totalVotes,
    date: req.body.date,
    one: req.body.one,
    two: req.body.two,
    tree: req.body.tree,
    four: req.body.four,
    five: req.body.five,
  };

  mongoService.insertCoffee(coffeeToAdd, function (err, result) {

    if(err){
      console.log(err);
      return.res.status(500).send(err);
    }
    console.log('Coffee To Add : ' + result.id);
    res.send(result);

  });

  var getAvarageVotes = function(query, res){

    var vote = {};

  };

  controller.get = function(req, res) {
    var query = {};
    var queryParamsExists = Object.keys(req.query).length !== 0;

    if (queryParamsExists) {
      query = buildQuery(req);
    }

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
}
