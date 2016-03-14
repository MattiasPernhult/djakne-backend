var CoffeeSchema = require('../schemas/coffee');

var mongoService = function() {

  var insertCoffee = function(coffeeToAdd, callback) {
    var newCoffee = new CoffeeSchema(coffeeToAdd);
    newCoffee.save(function(err, response) {
      if (err) {
        return callback(err, null);
      }
      var r = {
        id: response._id,
      };
      return callback(null, r);
    });
  };

  var getCoffee = function(query, callback) {
    CoffeeSchema.find(query, function(err, coffee) {
      return callback(err, coffee);
    });
  };

  return {
    insertCoffee: insertCoffee,
    getCoffee: getCoffee,
  };
};

module.exports = mongoService();
