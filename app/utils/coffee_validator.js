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
    return false;
  }
  if (!this.isString(input.body.userID)) {
    return false;
  }
  if (input.body.vote.length !== 1) {
    return false;
  }
  if (!this.isString(input.body.djakneID)) {
    return false;
  }
  if (!validator.isUUID(input.body.djakneID)) {
    return false;
  }
  return true;
};

module.exports = coffeeValidator;
