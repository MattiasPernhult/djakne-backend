var validator = require('../utils/coffee_validator');
var uuid = require('node-uuid');

var CoffeeModel = function(title, description,
  startDate, endDate, image, webpage) {
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
  if (this.validateURL(webpage)) {
    this.webpage = webpage;
  }
  this.djakneID = uuid.v4();
  this.one = 0;
  this.two = 0;
  this.three = 0;
  this.four = 0;
  this.five = 0;
  this.voted = [];
};
CoffeeModel.prototype.checkAttributes = function() {
  return this.title !== undefined && this.description !== undefined &&
   this.startDate !== undefined && this.endDate !== undefined &&
   this.image !== undefined && this.webpage !== undefined;
};
CoffeeModel.prototype.validateString = function(attribute) {
  if (!validator.isString(attribute) ||
  !validator.hasMinLength(attribute, 2)) console.log('string');
  return validator.isString(attribute) &&
  validator.hasMinLength(attribute, 2);
};

CoffeeModel.prototype.validateDate = function(date) {
  if(!validator.isDate(date)) console.log('date');
  return validator.isDate(date);
};

CoffeeModel.prototype.trimStrings = function() {
  this.title.trim();
  this.description.trim();
};

CoffeeModel.prototype.validateURL = function(url) {
  if(!validator.isURL(url)) console.log('url');
  return validator.isURL(url);
};

module.exports = CoffeeModel;
