var mongoose = require('mongoose');

var CoffeeVoteSchema = new mongoose.Schema({

  title: String,
  description: String,
  totalVote: Number,
  date: Date,
  one: Number,
  two: Number,
  tree: Number,
  four: Number,
  five: Number,
});

module.exports = mongoose.model('Coffe', CoffeeVoteSchema);
