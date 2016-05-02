var GrowthSchema = require('../schemas/growth_letter').GrowthLetter;

var mongoService = function() {

  var getIssues = function(done) {
    GrowthSchema.find({}, function(err, issues) {
      done(err, issues);
    });
  };

  return {
    getIssues: getIssues,
  };
};

module.exports = mongoService();
