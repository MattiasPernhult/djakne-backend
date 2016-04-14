var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var jsonParser = bodyParser.json();

var eventCtrl = require('../controllers/event_controller');
var auth = require('../../app/middleware/auth');

router.post('/', jsonParser, function(req, res, next) {
  eventCtrl.post(req, res);
});

router.get('/',function(req, res, next) {
  console.log('i event get');
  eventCtrl.get(req, res);
});

router.post('/register/:id', auth.requiresLogin, function(req, res, next) {
  console.log('i register/id');
  eventCtrl.registerForEvent(req, res);
});

module.exports = router;
