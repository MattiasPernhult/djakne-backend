var express = require('express');
var router = express.Router();

var userCtrl = require('../controllers/users_controller');

router.get('/',function(req, res, next) {
  console.log('I router /user get');
  userCtrl.getUsersById(req, res);
});

module.exports = router;
