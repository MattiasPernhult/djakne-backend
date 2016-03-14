var mongoService = require('../services/mongo_event_service');
var EventModel = require('../models/event_model');
var helper = require('../utils/helper');

var controller = {};

controller.post = function(req, res) {
  // console.log('i events/ post');

  var eventToAdd = createEventModel(req);
  if (eventToAdd.checkAttributes()) {
    return res.status(400).send({message: 'The parameters for the event were wrong'});
  }
  mongoService.insertEvent(eventToAdd, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('Event added : ' + result.id);
    console.log(res);
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

var buildQuery = function(req, res) {
  var query = {
    date: {},
  };
  if (req.query.dateFrom !== undefined) {
    query.date.$gte = new Date(req.query.dateFrom);
  }
  if (req.query.dateTo !== undefined) {
    query.date.$lt = new Date(req.query.dateTo);
    /* if (req.query.dateFrom !== undefined) {
      if (!dateToIsValid(req.query.dateFrom, req.query.dateTo)) {
        console.log('fel !! ');
        error = {message: 'The dateTo-parameter must be later in time than dateFrom'};
      }
    } */
  }
  return query;
};

var createEventModel = function(req) {
  var body = req.body;
  var eventToAdd = new EventModel(body.title, body.text, body.author, body.date);
  return eventToAdd;
};

module.exports = controller;
