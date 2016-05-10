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
    return res.send({data: helper.sanitizeMembers(members.reverse(), true)});
  });
};

controller.getUsersById = function(req, res) {
  var arrayOfIds = splitStringOfIds(req.query.ids);
  mysqlService.getUsersById(arrayOfIds, function(err, users) {
    if (err) {
      return res.status(500).send({data: {error: err}});
    }
    res.send({data: helper.sanitizeMembers(users, true)});
  });
};

var splitStringOfIds = function(ids) {
  var arrayOfIds = ids.split(',');
  return arrayOfIds;
};

module.exports = controller;
