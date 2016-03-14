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
  coffeeController.getID(req.params.id);
});
/*
 * Endpoint for /
 * HTTP method: POST
 */

router.post('/', function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  console.log('I coffee routes /coffee post');
  coffeeController.post(req, res);
});

router.post('/vote/:id', function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  console.log('I coffee routes /coffee post');
  coffeeController.postVote(req, res);
});


module.exports = router;
