var controller = {};

var mysqlService = require('../services/mysql_service');
var helper = require('../utils/helper');

controller.getMenu = function(req, res) {
  mysqlService.getMenuWithCategory(function(err, products) {
    if (err) {
      return res.status(500).send({error: 'Shit.. we have some problem with the database...'});
    }
    var productsInCategory = helper.sanitizeProductNames(products, true);
    if (req.query.exclude && typeof req.query.exclude === 'string') {
      productsInCategory = helper.excludeCategories(productsInCategory);
    }
    if (req.query.join && typeof req.query.join === 'string') {
      productsInCategory = helper.joinCategories(productsInCategory, req.query.join.split(','));
    }
    return res.send({data: productsInCategory});
  });
};

module.exports = controller;
