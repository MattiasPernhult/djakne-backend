var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var coffeeController = require('../controllers/coffee_controller');

/**
 * Endpoint for /
 * HTTP method: GET
 */
router.get('/', function (req, res, next) {
  coffeeController.get(req, res);
});

/*
 * Endpoint for /
 * HTTP method: POST
 */

router.post('/', jsonParser, function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  console.log('I coffee routes /coffee post');
  coffeeController.post(req, res);
});


module.exports = router;
