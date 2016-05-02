var express = require('express');
var router = express.Router();

var retrotvController = require('../controllers/retro_tv_controller');
var auth = require('../middleware/auth');

/**
 * Endpoint for /
 * HTTP method: GET
 */
router.get('/', function(req, res, next) {
  retrotvController.getRetrotv(req, res);
});

router.post('/request', auth.requiresLogin, function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  retrotvController.postRequest(req, res);
});

module.exports = router;
