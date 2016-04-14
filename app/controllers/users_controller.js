var mysqlService = require('../services/mysql_service');

var controller = {};

controller.getUsersById = function(req, res) {
  var arrayOfIds = splitStringOfIds(req.query.ids);

  mysqlService.getUsersById(arrayOfIds, function(err, users) {
    if (err) {
      console.log('Error i mysql');
      return res.status(500).send({data: {error: err}});
    }
    res.send({data: {members: users}});
  });
};

var splitStringOfIds = function(ids) {
  var arrayOfIds = ids.split(',');
  return arrayOfIds;
};

module.exports = controller;
