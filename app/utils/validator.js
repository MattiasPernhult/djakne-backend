var validate = require('validator');

var validator = {};

validator.isStringAndMinLength = function(attribute) {
  console.log('attribute length: ' + attribute + ' : ' + attribute.length);
  return ((attribute.length > 3) && (typeof attribute === 'string'));
};

validator.eventDate = function(input) {
  // Make sure it's a string
  input = input + '';
  return validate.isDate(input);
};

module.exports = validator;
