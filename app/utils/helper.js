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
