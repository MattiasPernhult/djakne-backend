var controller = {};

var validator = require('../utils/calendar_validator');

var calendarService = require('../services/calendar_service');

controller.get = function(req, res) {
  var parameters = req.query;
  console.log(parameters);
  var errors = validator.validateGetParameters(parameters);
  if (errors.length > 0) {
    return res.status(400).send({errors: errors});
  }
  var query = {
    singleEvents: true,
    orderBy: 'startTime',
  };
  query.maxResults = parameters.limit || 10;
  query.timeMin = getDateTime(parameters.when);
  console.log(query);
  calendarService.getCalendarEvents(query, function(err, events) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({events: events});
  });
};

var getDateTime = function(when) {
  var date = new Date();
  if (!when) {
    return date.toISOString();
  }
  when = when.trim();
  if (when === 'week') {
    date.setDate(date.getDate() + 7);
  } else if (when === 'month') {
    date.setDate(date.getMonth() + 1);
  }
  return date.toISOString();
};

module.exports = controller;
