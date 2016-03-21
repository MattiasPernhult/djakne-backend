var mongoose = require('mongoose');

var CoffeeSchema = new mongoose.Schema({
  title: String,
  description: String,
  idDjakne: String,
  startDate: Date,
  endDate: Date,
  one: {type: Number, default: 0},
  two: {type: Number, default: 0},
  three: {type: Number, default: 0},
  four: {type: Number, default: 0},
  five: {type: Number, default: 0},
  djakneID: String,
  image: String,
  webpages: [String],
});

module.exports = mongoose.model('Coffee', CoffeeSchema);
