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
  return (typeof attribute === 'string' || attribute instanceof String);
};

coffeeValidator.isDate = function(input) {
  return validator.isISO8601(input);
};

coffeeValidator.isDateFromLessThanDateTo = function(dateFrom, dateTo) {
  return (new Date(dateTo) > new Date(dateFrom));
};

coffeeValidator.isURL = function(input) {
  return validator.isURL(input);
};

coffeeValidator.isUUID = function(input) {
  return validator.isUUID(input);
};

coffeeValidator.validateVote = function(input) {
  if (!this.isString(input.body.vote)) {
    console.log('vote/string');
    return false;
  }
  if (input.body.vote.length !== 1) {
    console.log('vote/length');
    return false;
  }
  if (!this.isString(input.body.djakneID)) {
    console.log('uuid/string');
    return false;
  }
  if (!validator.isUUID(input.body.djakneID)) {
    console.log('uuid');
    console.log(input.body.djakneID);
    return false;
  }
  return true;
};

module.exports = coffeeValidator;
