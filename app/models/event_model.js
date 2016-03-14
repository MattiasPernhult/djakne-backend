var validator = require('../utils/validator');

var Event = function(title, text, author, date) {
  if (this.validateTitle(title)) {
    this.title = title;
  }
  if (this.validateText(text)) {
    this.text = text;
  }
  if (this.validateAuthor(author)) {
    this.author = author;
  }
  if (this.validateDate(date)) {
    this.date = date.trim();
  }
};

Event.prototype.validateTitle = function(title) {
  var passed = true;
  passed = validator.hasMinLength(title, 3);
  passed = validator.isString(title);
  return passed;
};

Event.prototype.validateText = function(text) {
  var passed = true;
  passed = validator.hasMinLength(text, 5);
  passed = validator.isString(text);
  return passed;
};

Event.prototype.validateAuthor = function(author) {
  var passed = true;
  passed = validator.hasMinLength(author, 1);
  passed = validator.isString(author);
  return passed;
};

Event.prototype.validateDate = function(date) {
  var passed = true;
  passed = validator.isDate(date);
  return passed;
};

Event.prototype.trimStrings = function() {
  this.title = this.title.trim();
  this.text = this.text.trim();
  this.author = this.author.trim();
};

module.exports = Event;
