var calender = require('googleapis');
var ConferenceBooking = {
  summary: String,
  location: 'Conference room at Djäkne Startup Studio',
  description: String,
  start: {
    dateTime: String,
    timeZone: String,
  },
  end: {
    dateTime: String,
    timeZone: 'Europe/Stockholm',
  },
  attendees: [{
    email: String,
  }, {
    email: String,
  }, ],
};
module.exports =  ConferenceBooking;
