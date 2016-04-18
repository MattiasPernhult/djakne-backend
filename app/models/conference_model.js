var validator = require('../utils/validator');
var moment = require('moment');

var ConferenceModel = function(name, attendees, description, startDate, endDate, timeZone) {
  if (this.validateString(attendees)) {
    this.attendees = attendees;
  }
  if (this.validateString(description)) {
    this.description = description;
  }
  if (this.validateString(name)) {
    this.name = name;
  }
  if (this.validateDate(startDate)) {
    this.startDate = startDate;
  }
  if (this.validateDate(endDate)) {
    this.endDate = endDate;
  }
  this.timeZone = moment;

};

ConferenceModel.prototype.checkAttributes = function() {
  return this.description !== undefined && this.name !== undefined &&
  this.attendees !== undefined && this.startDate !== undefined &&
  this.endDate !== undefined;
};
ConferenceModel.prototype.validateString = function(attribute) {
  return validator.isString(attribute) && validator.hasMinLength(attribute, 2);
};

ConferenceModel.prototype.validateDate = function(date) {
  return validator.isDate(date);
};

module.exports = ConferenceModel;
