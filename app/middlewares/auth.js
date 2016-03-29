var User = require('../../app/services/user');

exports.requiresLogin = function(req, res, next) {
  console.log('i requiresLogin, token: ' + req.query.token);
  var token = req.query.token;
  var p = null;
  if (token) {
    console.log('token finns: ' + token);
    p = User.getByLinkedInToken(token);
    console.log(p);
  } else {
    // p = User.getByLinkedInId('nzKkG3dVnB');
  }

  if (p) {
    p.then(function(user) {
      if (!user) {
        res.status(403).send({
          error: 'Invalid token',
        });
      } else {
        console.log('user är hittad! : ' + JSON.Stringify(user, null, 4));
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).send({
      error: 'Missing token',
    });
  }
};
