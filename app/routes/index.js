var express = require('express');
var router = express.Router();
var mysqlService = require('../services/mysql_service');
var mongoService = require('../services/mongo_service');
var auth = require('../config/auth');
var authMiddleware = require('../middleware/auth');

router.get('/', function(req, res, next) {
  res.send('Hej');
});

router.get('/issues', function(req, res, next) {
  mongoService.getIssues(function(err, issues) {
    if (err) {
      return res.status(500).send({error: 'Error when fetching issues'});
    }
    return res.send({issues: issues});
  });
});

router.get('/wifi', authMiddleware.requiresLogin, function(req, res, next) {
  if (!req.body.user.id) {
    return res.status(400).send({error: 'Missing user id'});
  }
  mysqlService.isUserPremium(req.body.user.id, function(err, isPremium) {
    if (err) {
      return res.status(500).send({error: err});
    }
    var response = {
      member: {
        group: 'Djakne Member',
        wifiName: 'djakne-member',
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
