var mysqlService = require('../../app/services/mysql_service');

exports.requiresLogin = function(req, res, next) {
  // console.log('i requiresLogin, token: ' + req.query.token);
  var token = req.query.token;
  var user = null;
  if (token) {
    mysqlService.getByLinkedInToken(token, function(err, result) {
      if (err) {
        res.status(500).send('Shit..we have problems with the database');
      } else {
        // console.log('resultat från mysql: ' + JSON.stringify(result, null, 4));
        user = result;
        if (user) {
          // console.log('user är hittad! : ' + JSON.stringify(user, null, 4));
          req.user = user[0];
          next();
        } else {
          res.status(403).send({
            error: 'Missing token',
          });
        }
      }
    });
    // console.log('USER: ' + user);
  }
};
