var CoffeeVoteSchema = require('../schemas/vote')
var mongoService = function(){

  var insertCoffee = function(coffeeToAdd, callback){

    var newCoffee = new CoffeeVoteSchema(coffeeToAdd);
    newCoffee.save(function(err, response)){

      if(err){
        return callback(err, null);
      }
      var r = {
        id: response._id,
      };
      return callback(null, r);
    };
  });
 var getCoffeeVotes = function(query, callback){

   CoffeeVoteSchema.find(query, function (err, votes) {

   })
 }

};
