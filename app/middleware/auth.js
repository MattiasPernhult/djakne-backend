var mysqlService = require('../services/mysql_service');

var auth = {};

auth.requiresLogin = function(req, res, next) {
  var token = req.body.token;
  if (!token) {
    return res.status(400).send({message: 'Missing token'});
  }
  mysqlService.getUserByLinkedInToken(token, function(err, userFromDb) {
    if (!userFromDb || userFromDb.length === 0) {
      return res.status(400).send({message: 'Invalid token or user not found'});
    }
    console.log(userFromDb[0].id);
    // var user = {
    //   id: String(userFromDb[0].id),
    //   firstName: String(userFromDb[0].firstName),
    //   lastName: String(userFromDb[0].lastName),
    //   headline: String(userFromDb[0].headline),
    //   image: String(userFromDb[0].image),
    //   linkedInProfile: String(userFromDb[0].linkedInProfile),
    // };

    var user = userFromDb[0];
    req.body.user = user;
    console.log(JSON.stringify(req.body.user));
    next();
  });
};

module.exports = auth;
