var mongoose = require('mongoose');

var CoffeeSchema = new mongoose.Schema({

  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  one: Number,
  two: Number,
  three: Number,
  four: Number,
  five: Number,
  djakneID: String,
  image: String,
  webpage: String,
  voted: [String],
});

module.exports = mongoose.model('Coffee', CoffeeSchema);
