var validator = {};

validator.hasMinLength = function(attribute, minLength) {
  if (!validator.isString(attribute)) {
    return false;
  }
  if (typeof minLength !== 'number') {
    return false;
  }
  return (attribute.length >= minLength);
};

validator.isString = function(attribute) {
  return (typeof attribute === 'string');
};

validator.isDate = function(input) {
  if (input === undefined || typeof input !== 'string') {
    return false;
  }
  return input.match(/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
};

module.exports = validator;
