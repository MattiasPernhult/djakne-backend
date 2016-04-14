var express = require('express');
var router = express.Router();

var retrotvController = require('../controllers/retro_tv_controller');

/**
 * Endpoint for /
 * HTTP method: GET
 */
router.get('/', function(req, res, next) {
  retrotvController.getRetrotv(req, res);
});


module.exports = router;
