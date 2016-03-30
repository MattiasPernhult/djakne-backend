var mysqlService = require('../services/mysql_service');

var auth = {};

auth.requiresLogin = function(req, res, next) {
  var token = req.body.token;
  if (!token) {
    return res.status(400).send({message: 'Missing token'});
  }
  mysqlService.getUserByLinkedInToken(token, function(err, userid) {
    if (!userid) {
      return res.status(400).send({message: 'Invalid token'});
    }
    req.body.userID = String(userid[0].id);
    next();
  });
};

module.exports = auth;
