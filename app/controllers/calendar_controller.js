var controller = {};

var validator = require('../utils/calendar_validator');
var calendarService = require('../services/calendar_service');
var CalendarEvent = require('../models/calendar_event');

controller.delete = function(req, res) {
  if (!req.params.id) {
    return res.status(400).send({
      error: 'Missing id',
    });
  }
  calendarService.deleteCalendarEvent(req.params.id, function(err) {
    if (err) {
      return res.status(400).send({
        error: err,
      });
    }
    return res.send({
      data: 'Event ' + req.params.id + ' is deleted',
    });
  });
};

controller.post = function(req, res) {
  var body = req.body;
  var errors = validator.validatePostBody(body);
  if (errors.length > 0) {
    return res.status(400).send({
      error: {
        errors: errors,
      }
    });
  }
  var event = new CalendarEvent(body.summary, body.description, body.startTime, body.endTime);
  calendarService.insertCalendarEvent(event.toString(), function(err, event) {
    if (err) {
      return res.status(400).send({
        error: err,
      });
    }
    return res.send({
      data: event,
    });
  });
};

controller.get = function(req, res) {
  var parameters = req.query;
  var errors = validator.validateGetParameters(parameters);
  if (errors.length > 0) {
    return res.status(400).send({
      error: {
        errors: errors,
      }
    });
  }
  var query = {};
  query.maxResults = parameters.limit || 10;
  var time = getDateTime(parameters.timeMin, parameters.timeMax);
  query.timeMin = time.timeMin;
  query.timeMax = time.timeMax;
  calendarService.getCalendarEvents(query, function(err, events) {
    if (err) {
      return res.status(400).send({
        error: err,
      });
    }
    return res.send({
      data: events,
    });
  });
};

var getDateTime = function(timeMin, timeMax) {
  var dateMin = new Date();
  var dateMax = new Date();

  if (timeMin && timeMax) {
    dateMin.setDate(dateMin.getDate() + timeMin);
    dateMax.setDate(dateMax.getDate() + timeMax);
  } else if (timeMin && !timeMax) {
    dateMin.setDate(dateMin.getDate() + timeMin);
    dateMax.setDate(dateMax.getDate() + (timeMin + 7));
  } else if (!timeMin && timeMax) {
    dateMax.setDate(dateMax.getDate() + timeMax);
  } else {
    dateMax.setDate(dateMax.getDate() + 7);
  }
  var returnObject = {
    timeMin: dateMin.toISOString(),
    timeMax: dateMax.toISOString(),
  };
  return returnObject;
};

module.exports = controller;
