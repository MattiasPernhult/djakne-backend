var validate = require('coffeeValidator');

var coffeeValidator = {};


coffeeValidator.isStringAndMinLength = function(attribut) {
  console.log('attribut length :' + ' : ' + attribut.length);
  return ((attribut.length > 3) && (typeof attribut === 'string'));
};

coffeeValidator.voteDate = function(input) {
  // Make sure it's a string
  input = input + '';
  return coffeeValidator.voteDate(input);
};




module.exports = validator;
