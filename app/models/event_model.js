var validator = require('../utils/validator');

var Event = function(title, text, author, date) {
  this.title = title;
  this.text = text;
  this.author = author;
  this.date = date.trim();
};

Event.prototype.validate = function() {
  console.log('i model');
  if (validator.isStringAndMinLength(this.title) && validator.isStringAndMinLength(this.text) &&
  validator.isStringAndMinLength(this.author) && validator.eventDate(this.date)) {
    console.log('validering ok model');
    return true;
  }
  console.log('validering ej ok model');
  return false;
};

Event.prototype.trimStrings = function() {
  this.title = this.title.trim();
  this.text = this.text.trim();
  this.author = this.author.trim();
};

module.exports = Event;
