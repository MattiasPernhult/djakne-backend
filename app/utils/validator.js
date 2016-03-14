var validate = require('validator');

var validator = {};

validator.hasMinLength = function(attribute, minLength) {
  return (attribute.length >= minLength);
};

validator.isString = function(attribute) {
  return (typeof attribute === 'string');
};

validator.isDate = function(input) {
  if (input === undefined || typeof input !== 'string') {
    return false;
  }
  return validate.isDate(input);
};

module.exports = validator;
