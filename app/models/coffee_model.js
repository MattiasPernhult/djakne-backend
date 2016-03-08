var validator = require('../utils/coffee_validator');

var Coffee = function(title, description, date) {
  this.title = title;
  this.description = description;
  this.date = date.trim();
};

Coffee.prototype.validator = function() {
  console.log('i model');
  if (validator.isStringAndMinLength(this.title) &&
    validator.isStringAndMinLength(this.description) &&
    validator.eventDate(this.date)) {
    console.log('validering ok model');
    return true;
  }
  console.log('validering ej ok model');
  return false;
};
