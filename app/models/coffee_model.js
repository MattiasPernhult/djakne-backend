var validator = require('../utils/coffee_validator');

var Coffee = function(title, description, startDate, endDate,
  voteOne, voteTwo, voteThree, voteFour, voteFive, djakneID) {
  if (this.validateString(title)) {
    this.title = title;
  }
  if (this.validateString(description)) {
    this.description = description;
  }
  if (this.validateDate(startDate)) {
    this.startDate = startDate;
  }
  if (this.validateDate(endDate)) {
    this.endDate = endDate;
  }
  if (this.validateString(djakneID)) {
    this.djakneID = djakneID;
  }
  this.voteOne = 0;
  this.voteTwo = 0;
  this.voteThree = 0;
  this.voteFour = 0;
  this.voteFive = 0;
};
Coffee.prototype.checkAttributes = function() {
  return this.title !== undefined && this.description !== undefined &&
    this.djakneID !== undefined && this.startDate !== undefined &&
      this.endDate !== undefined;
};
Coffee.prototype.validateString = function(attribute) {
  return validator.isString(attribute) &&
  validator.hasMinLength(attribute, 2);
};

Coffee.prototype.validateDate = function(startDate) {
  return validator.isDate(startDate);
};

Coffee.prototype.validateDate = function(endDate) {
  return validator.isDate(endDate);
};

Coffee.prototype.trimStrings = function() {
  this.title.trim();
  this.description.trim();
};

module.exports = Coffee;
