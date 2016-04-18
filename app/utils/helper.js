var entities = require('entities');
var iconv = require('iconv-lite');
var capitalize = require('string-capitalize');
var moment = require('moment');

var helper = {};

var sanitize = function(s, encode) {
  if (encode) {
    s = iconv.encode(s, 'ISO-8859-1');
  }
  return entities.decodeHTML(s);
};

helper.sanitizeMembers = function(members, encode) {
  var sanitizedMembers = [];
  for (var member in members) {
    members[member].headline = sanitize(members[member].headline, encode);
    members[member].firstName = sanitize(members[member].firstName, encode);
    members[member].lastName = sanitize(members[member].lastName, encode);
    sanitizedMembers.push(members[member]);
  }
  return sanitizedMembers;
};

helper.sanitizeProductNames = function(products, encode) {
  var productsInCategory = {};
  for (var product in products) {
    products[product].name = capitalize(sanitize(products[product].name, encode));
    products[product].category = capitalize(sanitize(products[product].category, encode));
    if (!productsInCategory.hasOwnProperty(products[product].category)) {
      productsInCategory[products[product].category] = [];
    }
    productsInCategory[products[product].category].push(products[product]);
  }
  return productsInCategory;
};

module.exports = helper;
