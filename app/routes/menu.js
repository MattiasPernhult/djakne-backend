var express = require('express');
var router = express.Router();

var controller = require('../controllers/menu_controller.js');

router.get('/categories', function(req, res) {
  controller.getMenu(req, res);
});

module.exports = router;
