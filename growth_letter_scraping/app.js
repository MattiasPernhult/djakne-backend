var auth = require('../app/config/auth');

var request = require('request');
var mongoose = require('mongoose');

var GrowthSchema = require('../app/schemas/growth_letter').GrowthLetter;

mongoose.connect(auth.mongoConnection);

var issue = 2;
var year = 2016;

var getUrl = function() {
  var url = 'http://djakne.co/issue' + issue + '-' + year + '.html';
  return url;
};

var getApiUrl = function(url) {
  return 'https://api.import.io/store/connector/bba41b4b-b522-4046-b6d5-3af8b2dadcfc/_query?' +
  'input=webpage/url:' + url + '&&_apikey=518cdb55e5dc411fbd2ea051037b36b3e1f7018abe889cbed' +
  '27c0e7f669bcba8d8ae1b0b66741b6d7aca3ae74b5587cb73607f09f23095b8fab4c9e27631aa2efef18d91c' +
  '12f6c8be9d41f1f248a8251';
};

mongoose.connection.on('connected', function() {
  var url = getUrl();
  var apiUrl = getApiUrl(url);
  request(apiUrl, function(err, resp, body) {
    body = JSON.parse(body);
    var results = {};
    results.issue = body.results[0].data;
    results.letters = [];
    for (var i = 1; i < body.results.length - 1; i += 3) {
      var title = body.results[i].data;
      var description = body.results[i + 1].data;
      var object = {
        title: title,
        description: description,
        contacts: [],
      };
      var contacts = body.results[i + 2].data.split('Contact: ').join('').split(',');
      for (var j = 1; j < contacts.length; j += 2) {
        var contactEmail = contacts[j].trim();
        object.contacts.push(contactEmail);
      }
      results.letters.push(object);
    }
    var newGrowth = new GrowthSchema(results);
    GrowthSchema.findOne({issue: newGrowth.issue}, function(err, growthLetter) {
      if (!err && !growthLetter) {
        newGrowth.save(function(err) {
          if (err) {
            console.log('Problem when saving');
          } else {
            console.log('Saved successfully');
          }
          console.log('Bye....');
          process.exit(0);
        });
      } else {
        console.log('Growth letter already exists');
        if (err) {
          console.log(err);
        }
        console.log('Bye....');
        process.exit(0);
      }
    });
  });
});
