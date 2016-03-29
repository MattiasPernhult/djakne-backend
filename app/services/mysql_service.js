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

  var executeQuery = function(query, done) {
    connection.query(query, function(err, rows) {
      return done(err, rows);
    });
  };

  return {
    getMenuWithCategory: getMenuWithCategory,
  };

};

module.exports = mysqlService();
