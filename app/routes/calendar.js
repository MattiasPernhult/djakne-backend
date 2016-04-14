var express = require('express');
var router = express.Router();

var calendarController = require('../controllers/calendar_controller');

router.get('/', function(res, req, next) {
  calendarController.get(res, req);
});

router.post('/', function(res, req) {
  calendarController.postBooking(res, req);
});

router.get('/remove', function(res, req, next) {
  calendarController.removeBooking(res, req);
});

router.get('/update', function(res, req, next) {
  calendarController.upDate(res, req);
});

module.exports = router;
