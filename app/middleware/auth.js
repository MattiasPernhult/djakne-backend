var mysqlService = require('../services/mysql_service');

var auth = {};

auth.requiresLogin = function(req, res, next) {
  console.log('in requiresLogin function');
  console.log(req.body.token);
  console.log(req.query.token);
  var token = req.body.token;
  if (!token) {
    token = req.query.token;
    if (!token) {
      return res.status(400).send({
        message: 'Missing token',
      });
    }
  }
  mysqlService.getUserByLinkedInToken(token, function(err, userFromDb) {
    if (!userFromDb || userFromDb.length === 0) {
      return res.status(400).send({
        message: 'Invalid token or user not found',
      });
    }
    var user = userFromDb[0];
    req.body.user = user;
    next();
  });
};

module.exports = auth;
