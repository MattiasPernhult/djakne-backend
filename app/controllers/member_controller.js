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

module.exports = controller;
