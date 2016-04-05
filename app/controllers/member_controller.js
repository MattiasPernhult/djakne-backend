var controller = {};

var mysqlService = require('../services/mysql_service');
var helper = require('../utils/helper');

controller.getPeopleAtDjakneToday = function(req, res) {
  mysqlService.getPeopleAtDjakneToday(function(err, members) {
    if (err) {
      return res.status(500).send('Ohh... database is having some stomach problems, ' +
        'maybe to much coffee for one day...');
    }
    return res.send({members: helper.sanitizeMembers(members.reverse(), true)});
  });
};

controller.getUsersById = function(req, res) {
  var arrayOfIds = splitStringOfIds(req.query.ids);
  mysqlService.getUsersById(arrayOfIds, function(err, users) {
    if (err) {
      return res.status(500).send({data: {error: err}});
    }
    res.send({data: {members: helper.sanitizeMembers(users, true)}});
  });
};

var splitStringOfIds = function(ids) {
  var arrayOfIds = ids.split(',');
  return arrayOfIds;
};

module.exports = controller;
