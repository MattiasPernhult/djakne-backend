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

  connection.connect(function(err) {
    if (err) {
      console.error('MySQL: error connecting: ' + err.stack);
      return;
    }
    console.log('MySQL: connected as id ' + connection.threadId);
  });

  var getMenuWithCategory = function(done) {
    var query = 'SELECT djakne.product.name AS Produkt, djakne.product.id AS Id, ' +
      'djakne.product.price AS Pris, djakne.producttype.name AS Kategori FROM ' +
      'djakne.product_producttype INNER JOIN djakne.producttype ON djakne.producttype.id ' +
      '= djakne.product_producttype.producttype_id INNER JOIN djakne.product ON djakne.product.id ' +
      '= djakne.product_producttype.product_id;';
    executeQuery(query, done);
  };

  var getByLinkedInToken = function(token, done) {
    var query = mysql.format('SELECT * FROM `member` WHERE appToken = ?', [token]);
    executeQuery(query, done);
  };

  var getUsersById = function(ids, done) {
    var query = 'SELECT dm.id, dm.firstName, dm.lastName, dm.linkedInProfile, dm.headline,' +
    'dm.interests, dm.image FROM djakne.member AS dm';
    for (var i = 0; i < ids.length; i++) {
      if (i === 0) {
        query += ' WHERE dm.id = ';
      } else {
        query += ' OR dm.id = ';
      }
      query += ids[i];
    }
    console.log('MySQL_service, mysql query: ' + query);
    executeQuery(query, done);
  };

  var executeQuery = function(query, done) {
    connection.query(query, function(err, rows) {
      return done(err, rows);
    });
  };

  return {
    getMenuWithCategory: getMenuWithCategory,
    getByLinkedInToken: getByLinkedInToken,
    getUsersById: getUsersById,
  };
};

module.exports = mysqlService();
