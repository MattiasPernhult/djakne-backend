var controller = {};

var mysqlService = require('../services/mysql_service');
var helper = require('../utils/helper');

controller.getPeopleAtDjakneToday = function(req, res) {
  var query = {limit: undefined};
  if (req.query.limit) {
    if (isNaN(req.query.limit)) {
      return res.status(400).send({error: 'Limit parameter must be a number'});
    }
    query.limit = Number(req.query.limit);
  }
  mysqlService.getPeopleAtDjakneToday(query, function(err, members) {
    if (err) {
      var errorMessage = 'Ohh... database is having some stomach problems, ' +
        'maybe to much coffee for one day...';
      return res.status(500).send({error: errorMessage});
    }
    return res.send({members: helper.sanitizeMembers(members.reverse(), true)});
  });
};

module.exports = controller;
