var mongoService = require('../services/mongo_event_service');
var EventModel = require('../models/event_model');
var validator = require('../utils/validator');

var controller = {};

controller.post = function(req, res) {
  // console.log('i events/ post');

  var eventToAdd = createAndValidateEventModel(req);
  if (!eventToAdd) {
    return res.status(400).send({message: 'The parameters for the event were wrong'});
  }
  mongoService.insertEvent(eventToAdd, function(err, addedEvent) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('Event added : ' + addedEvent.result.id);
    res.send(addedEvent);
  });
};

controller.get = function(req, res) {
  var query = {};
  var errors = {};
  var queryParamsExists = Object.keys(req.query).length !== 0;

  if (queryParamsExists) {
    errors = validateQueryParameters(req.query);
    if (errors.length > 0) {
      return res.status(400).send({errors: errors});
    }
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
  }
  return query;
};

var validateQueryParameters = function(query) {
  var errors = [];
  if (query.dateFrom !== undefined) {
    if (!validator.dateIsValid(query.dateFrom)) {
      errors.push({message: 'The dateFrom query parameter is in the wrong format'});
    }
  }
  if (query.dateTo !== undefined) {
    if (!validator.dateIsValid(query.dateTo)) {
      errors.push({message: 'The dateTo query parameter is in the wrong format'});
    }
    if (query.dateFrom !== undefined) {
      if (!validator.isDateFromLessThanDateTo(query.dateFrom, query.dateTo)) {
        errors.push({message: 'The dateTo-parameter must be later in time than dateFrom'});
      }
    }
  }
  return errors;
};

var createAndValidateEventModel = function(req) {
  var body = req.body;
  var eventToAdd = new EventModel(body.title, body.text, body.author, body.date);
  if (eventToAdd.validate()) {
    return eventToAdd;
  }
  return null;
};

module.exports = controller;
