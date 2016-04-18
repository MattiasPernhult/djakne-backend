var validator = require('../utils/validator');
var helper = require('../utils/helper');

var Event = function(title, text, author, date, location) {
  if (this.validateString(title)) {
    this.title = title;
  }
  if (this.validateString(text)) {
    this.text = text;
  }
  if (this.validateString(author)) {
    this.author = author;
  }
  if (this.validateDate(String(date))) {
    this.date = helper.formatDateTime(date);
  }
  this.location = location;
};

Event.prototype.checkAttributes = function() {
  return this.title !== undefined && this.text !== undefined && this.author !== undefined &&
  this.date !== undefined;
};

Event.prototype.validateString = function(attribute) {
  return validator.isString(attribute) && validator.hasMinLength(attribute, 2);
};

Event.prototype.validateDate = function(date) {
  return validator.isDate(date);
};

module.exports = Event;
