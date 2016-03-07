var mongoService = require('../services/mongo_event_service');

var controller = {};

controller.post = function(req, res) {

  console.log('i events/ post');

  var eventToAdd = {
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    date: req.body.date,
  };

  mongoService.insertEvent(eventToAdd, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('Event added : ' + result.id);
    res.send(result);
  });
};

controller.get = function(req, res) {
  var query = {};
  var queryParamsExists = Object.keys(req.query).length !== 0;

  if (queryParamsExists) {
    query = buildQuery(req);
  }
  mongoService.getEvents(query, function(err, resultFromDB) {
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
