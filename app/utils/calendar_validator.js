var validator = {};

var validatorHelper = require('./validator');

validator.validateGetParameters = function(parameters) {
  var errors = [];
  if (parameters.limit) {
    if (!validatorHelper.isNumber(parameters.limit) && parameters.limit < 1) {
      errors.push({error: 'Parameter \'limit\' must be a number and greater than 1'});
    }
  }
  if (parameters.when) {
    if (!validatorHelper.isString(parameters.when)) {
      errors.push({error: 'Parameter \'when\' must be a string'});
    } else {
      parameters.when = parameters.when.trim();
      if (!correctWhen) {
        errors.push({error: 'Parameter \'when\' must either be today, week or month'});
      }
    }
  }
  return errors;
};

var correctWhen = function(when) {
  if (when === 'week' || when === 'month' || when === 'today') {
    return true;
  }
  return false;

}

module.exports = validator;
