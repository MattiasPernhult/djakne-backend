var express = require('express');
var router = express.Router();

var coffeeController = require('../controllers/coffee_controller');

/**
 * Endpoint for /
 * HTTP method: GET
 */
router.get('/history', function(req, res, next) {
  coffeeController.getHistory(req, res);
});

router.get('/current', function(req, res, next) {
  coffeeController.getCurrent(req, res);
});

router.get('/:id', function(req, res) {
  coffeeController.getID(req, res);
});

router.get('/remove/:id', function(req, res) {
  coffeeController.removeID(req, res);
});
/*
 * Endpoint for /
 * HTTP method: POST
 */
router.post('/', function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  coffeeController.post(req, res);
});
/*
 * Endpoint for /
 * HTTP method: PUT
 */
router.put('/vote', function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  coffeeController.putVote(req, res);
});


module.exports = router;
