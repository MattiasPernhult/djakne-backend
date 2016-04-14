var calendar = require('../schemas/quickstart');
var ConferenceModle = require('../models/conference_model');
var validator = require('../utils/validator');
var moment = require('moment');
var BookConference = require('../schemas/conference');

var controller = {};

controller.post = function(req, res) {

  var bookConference = creatBookConference(req);
  if (!bookConference.checkAttributes()) {
    return
    res.status(400).send({
      message: 'The parameters for the event were wrong',
    });
  }
  calendar.insert({
    auth: auth,
    calendarId: 'primary',
    resource: bookConference,
  }, function(err, bookConference) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', bookConference.htmlLink);
  });

  function listEvents(auth) {
    var calendar = google.calendar('v3');
    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var events = response.items;
      if (events.length == 0) {
        console.log('No upcoming events found.');
      } else {
        console.log('Upcoming 10 events:');
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          console.log('%s - %s', start, event.summary);
        }
      }
    });
  }
};
module.exports = controller;
