var mongoose = require('mongoose');

var GrowthLetterSchema = new mongoose.Schema({
  issue: String,
  letters: [{
    title: String,
    description: String,
    contacts: [String],
  },],
});

GrowthLetterSchema.options.toJSON = {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
};

module.exports = {
  GrowthLetter: mongoose.model('GrowthLetter', GrowthLetterSchema),
};
