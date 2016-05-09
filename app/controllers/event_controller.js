var mongoService = require('../services/mongo_event_service');
var pushService = require('../services/push_service');
var EventModel = require('../models/event_model');
var validator = require('../utils/validator');
var helper = require('../utils/helper');

var controller = {};

controller.addCommentToEvent = function(req, res) {
  var parameters = {
    eventId: req.params.id,
    userId: req.body.user.id,
    userFirstname: req.body.user.firstName,
    userLastname: req.body.user.lastName,
    comment: req.body.comment,
    userImage: req.body.user.image,
  };
  console.log(parameters);
  if (parameters.comment.length < 2) {
    return res.status(400).send({error: 'The comment must be at least one character'});
  }
  mongoService.addCommentToEvent(parameters, function(err, updatedEvent) {
    if (err) {
      return res.status(err.status).send({error: err.error});
    }
    pushService.notifyAllAttendants(updatedEvent.title, parameters.userId,
      updatedEvent.attendantsId);
    return res.send({event: updatedEvent});
  });
};

controller.removeCommentFromEvent = function(req, res) {
  var parameters = {
    eventId: req.params.id,
    userId: req.body.user.id,
    commentId: req.params.commentId,
  };

  mongoService.removeCommentFromEvent(parameters, function(err, updatedEvent) {
    if (err) {
      return res.status(err.status).send({error: err.error});
    }
    return res.send({event: updatedEvent});
  });
};

controller.post = function(req, res) {
  var eventToAdd = createEventModel(req);

  if (!eventToAdd.checkAttributes()) {
    return res.status(400).send({message: 'The parameters for the event were wrong'});
  }
  mongoService.insertEvent(eventToAdd, function(err, addedEvent) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(addedEvent);
  });
};

controller.deleteEvent = function(req, res) {
  console.log('i deleteEvent, req.params.id = ' + req.params.id);
  if (!req.params.id) {
    return res.status(400).send({message: 'You must provide an event id for deletion'});
  }
  mongoService.deleteEvent(req.params.id, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({message: 'Event was successfully deleted'});
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
  console.log('i registerForEvent');
  if (!req.body.user.id) {
    return res.status(400).send({error: 'You are not authenticated'});
  }
  console.log('är inloggad');
  mongoService.registerForEvent(req.body.user, req.params.id, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send({message: 'Something went wrong..', error: err});
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
  if (!body.location) {
    body.location = 'Djäkne';
  }
  var eventToAdd = new EventModel(body.title, body.text, body.author, body.date, body.location);
  return eventToAdd;
};

module.exports = controller;
