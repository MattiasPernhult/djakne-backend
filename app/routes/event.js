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
  eventCtrl.get(req, res);
});

router.post('/register/:id', auth.requiresLogin, function(req, res, next) {
  eventCtrl.registerForEvent(req, res);
});

router.put('/:id/comment', auth.requiresLogin, function(req, res, next) {
  eventCtrl.addCommentToEvent(req, res);
});

router.put('/:id/comment/:commentId', auth.requiresLogin, function(req, res, next) {
  eventCtrl.removeCommentFromEvent(req, res);
});

router.put('/:id', auth.requiresLogin, function(req, res, next) {
  eventCtrl.deleteEvent(req, res);
});

module.exports = router;
