var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  linkedInProfile: String,
  headline: String,
  image: String,
});

var CommentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  memberId: String,
  comment: String,
  date: {type: Date, default: new Date()},
});

var EventSchema = new mongoose.Schema({
  title: String,
  text: String,
  author: String,
  location: String,
  date: Date,
  attendants: [UserSchema],
  attendantsId: [String],
  comments: [CommentSchema],
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Event: mongoose.model('Event', EventSchema),
  Comment: mongoose.model('Comment', CommentSchema),
};
