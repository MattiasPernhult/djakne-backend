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

module.exports = coffeeValidator;
