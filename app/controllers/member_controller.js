var controller = {};

var mysqlService = require('../services/mysql_service');

controller.getPeopleAtDjakneToday = function(req, res) {
  mysqlService.getPeopleAtDjakneToday(function(err, members) {
    if (err) {
      return res.status(500).send('Ohh... database is having some stomach problems, ' +
        'maybe to much for one day...');
    }
    return res.send({members: members.reverse()});
  });
};

module.exports = controller;
