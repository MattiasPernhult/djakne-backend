var express = require('express');
var router = express.Router();

var conferenceController = require('../controllers/conference_controller');

router.get('/', function(res, req, next) {
  conferenceController.getBooking(res, req);
});

router.post('/', function(res, req) {
  conferenceController.postBooking(res, req);
});

router.get('/remove', function(res, req, next) {
  conferenceController.removeBooking(res, req);
});

router.get('/update', function(res, req, next) {
  conferenceController.upDate(res, req);
});
module.exports = router;
