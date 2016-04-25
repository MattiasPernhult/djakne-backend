var express = require('express');
var router = express.Router();

var calendarController = require('../controllers/calendar_controller');

router.get('/', function(req, res, next) {
  calendarController.get(req, res);
});

router.post('/', function(req, res) {
  calendarController.post(req, res);
});

router.delete('/:id', function(req, res) {
  calendarController.delete(req, res);
});

module.exports = router;
