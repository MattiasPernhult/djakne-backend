var controller = {};

var mysqlService = require('../services/mysql_service');
var helper = require('../utils/helper');

controller.getMenu = function(req, res) {
  mysqlService.getMenuWithCategory(function(err, products) {
    if (err) {
      return res.status(500).send('Shit.. we have some problem with the database...');
    }
    var productsInCategory = helper.sanitizeProductNames(products, true);
    return res.send({products: productsInCategory});
  });
};

module.exports = controller;
