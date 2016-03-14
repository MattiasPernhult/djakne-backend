var validator = require('../utils/validator');

var Event = function(title, text, author, date) {
  if (this.validateString(title)) {
    this.title = title;
  }
  if (this.validateString(text)) {
    this.text = text;
  }
  if (this.validateString(author)) {
    this.author = author;
  }
  if (this.validateDate(date)) {
    this.date = date;
  }
};

Event.prototype.validateString = function(attribute) {
  return validator.isString(attribute) && validator.hasMinLength(attribute, 2);
};

Event.prototype.validateDate = function(date) {
  return validator.isDate(date);
};

Event.prototype.trimStrings = function() {
  this.title = this.title.trim();
  this.text = this.text.trim();
  this.author = this.author.trim();
};

module.exports = Event;
