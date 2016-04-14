var mongoService = require('../services/mongo_event_service');
var EventModel = require('../models/event_model');
var validator = require('../utils/validator');
var helper = require('../utils/helper');

var controller = {};

controller.post = function(req, res) {
  // console.log('i events/ post');

  var eventToAdd = createEventModel(req);

  if (!eventToAdd.checkAttributes()) {
    return res.status(400).send({message: 'The parameters for the event were wrong'});
  }
  mongoService.insertEvent(eventToAdd, function(err, addedEvent) {
    if (err) {
      return res.status(500).send(err);
    }
    // console.log('Event added : ' + addedEvent.result.id);
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
    query = buildQueryToGetEvents(req);
  }
  mongoService.getEvents(query, function(err, resultFromDB) {
    if (err) {
      return res.status(500).send(err);
    }
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

controller.registerForEvent = function(req, res) {
  if (!req.body.user.id) {
    return res.status(400).send({error: 'You are not authenticated'});
  }
  mongoService.registerForEvent(req.body.user, req.params.id, function(err, resultFromDB) {
    if (err) {
      if (err.status) {
        res.status(err.status);
      } else {
        res.status(500);
      }
      return res.send({message: 'Something went wrong..', error: err});
    }
    resultFromDB.attendants = helper.sanitizeMembers(resultFromDB.attendants, true);
    return res.send(resultFromDB);
  });
};

var buildQueryToGetEvents = function(req, res) {
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
    if (!validator.isDate(query.dateFrom)) {
      errors.push({message: 'The dateFrom query parameter is in the wrong format'});
    }
  }
  if (query.dateTo !== undefined) {
    if (!validator.isDate(query.dateTo)) {
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

var createEventModel = function(req) {
  var body = req.body;
  if (body.location === undefined) {
    body.location = null;
  }
  var eventToAdd = new EventModel(body.title, body.text, body.author, body.date, body.location);
  return eventToAdd;
};

module.exports = controller;
