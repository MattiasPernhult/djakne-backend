var google = require('googleapis');

var calendar = google.calendar('v3');
var key = require('../config/auth').calendar;

var Calendar = require('../models/calendar');

var jwtClient = new google.auth.JWT(key.clientEmail, null, key.privateKey,
  ['https://www.googleapis.com/auth/calendar'], null);

var calendarService = function() {

  var authorize = function(authorized) {
    jwtClient.authorize(function(err, tokens) {
      authorized(err);
    });
  };

  var getCalendarEvents = function(query, done) {
    authorize(function(err)  {
      if (err) {
        done(err, null);
      }
      query.auth = jwtClient;
      query.calendarId = key.calendarId;
      calendar.events.list(query, function(err, response) {
        if (err) {
          return done(err, null);
        }
        var events = response.items;
        var minimizedEvents = events.map(function(event) {
          return new Calendar(event.id, event.status, event.htmlLink, event.created,
            event.summary, event.creator, event.start, event.end);
        });
        done(null, minimizedEvents);
      });
    });
  };

  return {
    getCalendarEvents: getCalendarEvents,
  };
};

module.exports = calendarService();
