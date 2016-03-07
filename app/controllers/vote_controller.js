
var mongoService = require('../services/mongo_event_service');
var controller = {};

controller.post = function (req, res) {

console.log('i votes/ post');
 var coffeeToAdd={

    title: req.body.title,
    description: req.body.description,
    totalVote: req.body.totalVote,
    date: req.body.date,
    one: req.body.one,
    two: req.body.two,
    tree: req.body.tree,
    four: req.body.four,
    five: req.body.five,
 };

 mongoService.insertCoffee(coffeeToAdd, function (err, result) {

   if(err){
     console.log(err);
     return.res.status(500).send(err);
   }
   console.log('coffee To Add : ' + result.id);
   res.send(result);

 });

var getAvarageVotes = function(query, res){

 var vote= {};



};

}
