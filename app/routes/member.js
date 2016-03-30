var express = require('express');
var router = express.Router();

var controller = require('../controllers/member_controller');

router.get('/today', function(req, res) {
  controller.getPeopleAtDjakneToday(req, res);
});

module.exports = router;
