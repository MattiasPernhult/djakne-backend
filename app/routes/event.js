var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var jsonParser = bodyParser.json();


var eventCtrl = require('../controllers/event_controller');

router.post('/', jsonParser, function(req, res, next) {
  // TODO: anropa helper funktion som kollar att alla parametrar finns
  console.log('I router /event post');
  eventCtrl.post(req, res);
});

router.get('/',function(req, res, next) {
  console.log('I router /event get');
  eventCtrl.get(req, res);
});

module.exports = router;
