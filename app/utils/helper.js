var entities = require('entities');
var iconv = require('iconv-lite');
var capitalize = require('string-capitalize');

var helper = {};

var sanitize = function(s, encode) {
  if (encode) {
    s = iconv.encode(s, 'ISO-8859-1');
  }
  return entities.decodeHTML(s);
};

helper.sanitizeProductNames = function(products, encode) {
  for (var product in products) {
    products[product].name = capitalize(sanitize(products[product].name, encode));
  }
};

module.exports = helper;
