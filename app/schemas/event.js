var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  title: String,
  text: String,
  author: String,
  date: Date,
  attendee: [String],
});

module.exports = mongoose.model('Event', EventSchema);
