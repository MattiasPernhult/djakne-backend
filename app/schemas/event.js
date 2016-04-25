var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  linkedInProfile: String,
  headline: String,
  image: String,
});

var EventSchema = new mongoose.Schema({
  title: String,
  text: String,
  author: String,
  location: String,
  date: Date,
  attendants: [UserSchema],
  attendantsId: [String],
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Event: mongoose.model('Event', EventSchema),
};
