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

helper.excludeCategories = function(products) {
  return products;
};

// TODO: More error handling
helper.joinCategories = function(products, join) {
  console.log(products);
  for (var i = 0; i < join.length; i += 2) {
    var main = join[i];
    var sub = join[i + 1];
    console.log(products[main]);
    console.log(products[sub]);
    products[main] = products[main].concat(products[sub]);
    delete products[sub];
  }
  console.log(products);
  return products;
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

var getEnglishCategory = function(category) {
  switch (category) {
    case 'Kaffe':
      return 'Coffee';
    case 'Kall dryck':
      return 'Cold drink';
    case 'Mat':
      return 'Food';
    case 'Kakor':
      return 'Cookies';
    case 'Frukost':
      return 'Breakfast';
    case 'Droppkaffe':
      return 'Dropcoffee';
    case 'Julmust':
      return 'Christmas must';
    case 'Hela bönor':
      return 'Whole coffee beans';
    case 'Godis':
      return 'Sweets';
    case 'Specialte':
      return 'Special tea';
    default:
      return category;
  }
};

helper.sanitizeProductNames = function(products, encode) {
  var productsInCategory = {};
  for (var product in products) {
    products[product].name = capitalize(sanitize(products[product].name, encode));
    var category = capitalize(sanitize(products[product].category, encode));
    var categoryEnglish = getEnglishCategory(category);
    products[product].category = categoryEnglish;
    if (!productsInCategory.hasOwnProperty(products[product].category)) {
      productsInCategory[products[product].category] = [];
    }
    productsInCategory[products[product].category].push(products[product]);
  }
  return productsInCategory;
};

module.exports = helper;
