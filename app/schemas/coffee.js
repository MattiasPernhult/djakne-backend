var mongoose = require('mongoose');

var CoffeeSchema = new mongoose.Schema({

  title: String,
  description: String,
  totalVotes: Number,
  date: Date,
  one: Number,
  two: Number,
  three: Number,
  four: Number,
  five: Number,
});

module.exports = mongoose.model('Coffee', CoffeeSchema);
