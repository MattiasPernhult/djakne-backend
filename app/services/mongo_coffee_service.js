var CoffeeSchema = require('../schemas/coffee');

var mongoService = function() {

  var insertCoffee = function(coffeeToAdd, callback) {
    var newCoffee = new CoffeeSchema(coffeeToAdd);
    newCoffee.save(function(err, response) {
      if (err) {
        return callback(err, null);
      }
      var r = {
        djakneID: response.djakneID,
      };
      return callback(null, r);
    });
  };

  var getCoffee = function(query, callback) {
    CoffeeSchema.find(query, function(err, coffee) {
      return callback(err, coffee);
    });
  };

  var getCoffeeOne = function(query, callback) {
    CoffeeSchema.findOne(query, function(err, coffee) {
      return callback(err, coffee);
    });
  };

  var getCoffeeOneCurrent = function(query, callback) {
    CoffeeSchema.find({}).sort({startDate: -1}).limit(1).exec(callback);
  };

  var putVote = function(id, query, callback) {
    console.log('service: ' + id);
    CoffeeSchema.update({ djakneID: id }, query,
      function(err, coffee) {
        return callback(err, coffee);
      });
  };

  return {
    insertCoffee: insertCoffee,
    getCoffee: getCoffee,
    getCoffeeOne: getCoffeeOne,
    getCoffeeOneCurrent: getCoffeeOneCurrent,
    putVote: putVote,
  };
};

module.exports = mongoService();
