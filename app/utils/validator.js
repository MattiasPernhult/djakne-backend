var validate = require('validator');

var validator = {};

validator.hasMinLength = function(attribute) {
  return (attribute.length > 3);
};

validator.isString = function(attribute) {
  return (typeof attribute === 'string');
};

validator.dateIsValid = function(input) {
  // Make sure it's a string
  input = input + '';
  return validate.isDate(input);
};

validator.isDateFromLessThanDateTo = function(dateFrom, dateTo) {
  return (new Date(dateTo) > new Date(dateFrom));
};

module.exports = validator;
