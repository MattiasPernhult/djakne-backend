var controller = {};

var mysqlService = require('../services/mysql_service');

controller.getMenu = function(req, res) {
  mysqlService.getMenuWithCategory(function(err, rows) {
    if (err) {
      return res.status(500).send('Shit.. we have some problem with the database...');
    }
    return res.send({result: rows});
  });
};

module.exports = controller;
