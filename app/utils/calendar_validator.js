var validator = {};

var validatorHelper = require('./validator');

validator.validateGetParameters = function(parameters) {
  var errors = [];
  if (parameters.limit) {
    if (!validatorHelper.isNumber(parameters.limit) && parameters.limit < 1) {
      errors.push({error: 'Parameter \'limit\' must be a number and greater than 1'});
    }
  }
  if (parameters.timeMin) {
    if (!validatorHelper.isNumber(parameters.timeMin)) {
      errors.push({error: 'Parameter \'timeMin\' must be a number'});
    }
  }
  if (parameters.timeMax) {
    if (!validatorHelper.isNumber(parameters.timeMax)) {
      errors.push({error: 'Parameter \'timeMax\' must be a number'});
    }
  }
  return errors;
};

// TODO: This validation works for our purpose, but should add validation to get
// more specific error messages.
validator.validatePostBody = function(body) {
  var errors = [];
  if (!body.startTime) {
    errors.push({error: 'Must provide \'startTime\' in the request body'});
  } else {
    if (body.startTime.indexOf('Z')) {
      errors.push({error: '\'startTime\' cannot have a Z in the date'});
    }
  }
  if (!body.endTime) {
    errors.push({error: 'Must provide \'endTime\' in the request body'});
  } else {
    if (body.endTime.indexOf('Z')) {
      errors.push({error: '\'endTime\' cannot have a Z in the date'});
    }
  }
  return errors;
};

module.exports = validator;
