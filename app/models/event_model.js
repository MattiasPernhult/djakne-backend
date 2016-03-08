var validator = require('../utils/validator');

var Event = function(title, text, author, date) {
  this.title = title;
  this.text = text;
  this.author = author;
  this.date = date.trim();
};

Event.prototype.validate = function() {
  console.log('i model');

  if (!this.runNullCheckValidation()) {
    if (this.runStringCheckValidation()) {
      if (this.runLengthValidation()) {
        if (validator.dateIsValid(this.date)) {
          console.log('validering ok model');
          return true;
        }
        console.log('validering ej ok model');
        return false;
      }
      return false;
    }
    return false;
  }
  return false;
};

Event.prototype.runLengthValidation = function() {
  console.log('lenght validation');
  if (validator.hasMinLength(this.title) && validator.hasMinLength(this.text) &&
  validator.hasMinLength(this.author))  {
    return true;
  }
  return false;
};

Event.prototype.runNullCheckValidation = function() {
  console.log('nullcheck');
  console.log(!this.title);
  console.log(this.text);
  console.log(this.author);
  console.log(this.date);
  if (!this.title && !this.text && !this.author && !this.date) {
    return true;
  }
  return false;
};

Event.prototype.runStringCheckValidation = function() {
  console.log('string check');
  if (validator.isString(this.title) && validator.isString(this.text) &&
  validator.isString(this.author)) {
    return true;
  }
  return false;
};

Event.prototype.trimStrings = function() {
  this.title = this.title.trim();
  this.text = this.text.trim();
  this.author = this.author.trim();
};

module.exports = Event;
