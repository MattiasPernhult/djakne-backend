var validate = require('validator');

var validator = {};

validator.hasMinLength = function(attribute) {
  console.log('attribute length: ' + attribute + ' : ' + attribute.length);
  return (attribute.length > 3);
};

validator.isString = function(attribute) {
  console.log('attribute: ' + attribute + ' ' + typeof attribute);
  return (typeof attribute === 'string');
};

validator.dateIsValid = function(input) {
  // Make sure it's a string
  input = input + '';
  return validate.isDate(input);
};

module.exports = validator;
