var validator = require('../utils/coffee_validator');
var uuid = require('node-uuid');

var CoffeeModel = function(title, description, startDate, endDate, image, link) {
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
  if (this.validateURL(image)) {
    this.image = image;
  }
  if (this.validateURL(link)) {
    this.link = link;
  }
  this.djakneID = uuid.v4();
  this.one = 0;
  this.two = 0;
  this.three = 0;
  this.four = 0;
  this.five = 0;
};
CoffeeModel.prototype.checkAttributes = function() {
  return this.title !== undefined && this.description !== undefined &&
   this.startDate !== undefined && this.endDate !== undefined &&
   this.image !== undefined && this.link !== undefined;
};
CoffeeModel.prototype.validateString = function(attribute) {
  return validator.isString(attribute) &&
  validator.hasMinLength(attribute, 2);
};

CoffeeModel.prototype.validateDate = function(startDate) {
  return validator.isDate(startDate);
};

CoffeeModel.prototype.validateDate = function(endDate) {
  return validator.isDate(endDate);
};

CoffeeModel.prototype.trimStrings = function() {
  this.title.trim();
  this.description.trim();
};

CoffeeModel.prototype.validateURL = function(url) {
  return validator.isURL(url);
};

module.exports = CoffeeModel;
