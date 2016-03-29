var mysql = require('mysql');
var Q = require('q');

var config = require('../../app/config/mysql_connection');

var connection = mysql.createConnection({
  host: config.DB_HOST,
  port: 3306,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});


module.exports = {

  query: function(query, single) {
    var deferred = Q.defer();
    connection.query(query, function(err, rows) {
      if (err) {
        console.log('mysql error', err);
        deferred.reject(err);
      } else {
        deferred.resolve(single ? (rows.length > 0 ? rows[0] : null) : rows);
      }
    });
    return deferred.promise;
  },
};
