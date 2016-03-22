var validator = require('validator');
var coffeeValidator = {};

coffeeValidator.hasMinLength = function(attribute, minLength) {
  if (!coffeeValidator.isString(attribute)) {
    return false;
  }
  if (typeof minLength !== 'number') {
    return false;
  }
  return (attribute.length >= minLength);
};

coffeeValidator.isString = function(attribute) {
  return (typeof attribute === 'string');
};

coffeeValidator.sssisDate = function(input) {
  if(validator.isISO8601(input) && this.isString(input)) console.log(input);
  return validator.isISO8601(input) && this.isString(input);
};


coffeeValidator.isDate = function(input) {
  if (input === undefined || typeof input !== 'string') {
    return false;
  }
  return input.match(/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
};

coffeeValidator.isDateFromLessThanDateTo = function(dateFrom, dateTo) {
  return (new Date(dateTo) > new Date(dateFrom));
};

coffeeValidator.isURL = function(input) {
  return validator.isURL(input);
};

coffeeValidator.validateVote = function(input) {
  if (!this.isString(input.body.vote)) {
    return false;
  }
  if (!this.isString(input.body.userID)) {
    return false;
  }
  if (input.body.vote.length !== 1) {
    return false;
  }
  return true;
};

module.exports = coffeeValidator;
