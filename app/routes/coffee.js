var express = require('express');
var router = express.Router();

var voteController = require('../controllers/coffee_controller');

/**
 * Endpoint for /
 * HTTP method: GET
 */
router.get('/', function (req, res, next) {
  coffee_controller.get(req, res);
});

/**
 * Endpoint for /
 * HTTP method: POST
 */
 router.post  ('/', function(req, res, next)){


 };


module.exports = router;
