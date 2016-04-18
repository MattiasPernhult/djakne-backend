var express = require('express');
var router = express.Router();
var mysqlService = require('../services/mysql_service');
var auth = require('../config/auth');

router.get('/', function(req, res, next) {
  res.send('Hej');
});

router.get('/wifi', function(req, res, next) {
  if (!req.query.userId) {
    return res.status(400).send({error: 'Missing user id'});
  }
  mysqlService.isUserPremium(req.query.userId, function(err, isPremium) {
    if (err) {
      return res.status(500).send({error: err});
    }
    var response = {
      member: {
        group: 'Djakne Premium',
        wifiName: 'djakne-premium',
        wifiPassword: auth.wifiPassword.member,
      },
    };
    if (isPremium) {
      response.premium = {
        group: 'Djakne Premium',
        wifiName: 'djakne-premium',
        wifiPassword: auth.wifiPassword.premium,
      };
    }
    return res.send(response);
  });
});

module.exports = router;
