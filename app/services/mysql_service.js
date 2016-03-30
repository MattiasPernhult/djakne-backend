var mysql = require('mysql');
var auth = require('../config/auth');

var mysqlService = function() {

  var connection = mysql.createConnection({
    host: auth.mysql.host,
    port: auth.mysql.port,
    user: auth.mysql.user,
    password: auth.mysql.password,
    database: auth.mysql.database,
  });

  var getMenuWithCategory = function(done) {
    var query = 'SELECT djakne.product.name AS name, djakne.product.id AS id, ' +
    'djakne.product.price AS price, djakne.producttype.name AS category FROM ' +
    'djakne.product_producttype INNER JOIN djakne.producttype ON djakne.producttype.id ' +
    '= djakne.product_producttype.producttype_id INNER JOIN djakne.product ON djakne.product.id ' +
    '= djakne.product_producttype.product_id WHERE djakne.product.showInMenu = 1;';
    executeQuery(query, done);
  };

  var getPeopleAtDjakneToday = function(done) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var day = date.getDate();
    var onlyDate = year + '-' + month + '-' + day;

    var query = mysql.format('SELECT dm.id, dm.firstName, dm.lastName, dm.image FROM ' +
    'djakne.member AS dm INNER JOIN djakne.`order` as do ON dm.id = do.member_id ' +
    'WHERE date(do.orderTime) = ? and dm.active = 1 and dm.image != "" ' +
    'GROUP BY dm.id;', [onlyDate]);
    executeQuery(query, done);
  };

  var getUserByLinkedInToken = function(token, done) {
    var query = mysql.format('SELECT id FROM `member` WHERE appToken = ?', [token]);
    executeQuery(query, done);
  };

  var executeQuery = function(query, done) {
    connection.query(query, function(err, rows) {
      return done(err, rows);
    });
  };

  return {
    getMenuWithCategory: getMenuWithCategory,
    getUserByLinkedInToken: getUserByLinkedInToken,
    getPeopleAtDjakneToday: getPeopleAtDjakneToday,
  };

};

module.exports = mysqlService();
