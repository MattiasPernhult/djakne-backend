var mysqlService = require('../services/mysql_service');

var controller = {};

controller.getUsersById = function(req, res) {
  var arrayOfIds = splitStringOfIds(req.query.ids);

  mysqlService.getUsersById(arrayOfIds, function(err, users) {
    if (err) {
      return res.status(500).send({error: err});
    }
    res.send({data: users});
  });
};

var splitStringOfIds = function(ids) {
  var arrayOfIds = ids.split(',');
  return arrayOfIds;
};

module.exports = controller;
