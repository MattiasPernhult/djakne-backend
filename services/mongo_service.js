// project packages
var TestfileSchema = require('../schemas/testfile');
var UserSchema = require('../schemas/user');
var AdminSchema = require('../schemas/admin');

var mongoService = function() {

  var insertTestfile = function(file, callback) {
    var testfile = new TestfileSchema(file);
    testfile.save(function(err, response) {
      if (err)  {
        return callback(err, null);
      }
      var r = {
        id: response._id,
      };
      return callback(null, r);
    });
  };

  var getTestfileById = function(id, callback)  {
    TestfileSchema.find({
      _id: id,
    }, function(err, testfile) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, testfile);
    });
  };

  var findUserById = function(id, callback) {
    UserSchema.findById(id, function(err, user) {
      callback(err, user);
    });
  };

  var findOne = function(query, callback) {
    UserSchema.findOne(query, function(err, result) {
      callback(err, result);
    });
  };

  var saveGoogleUser = function(profile, token, callback) {
    var newUser = new UserSchema();
    newUser.google.id = profile.id;
    newUser.google.token = token;
    newUser.google.name = profile.displayName;
    newUser.google.email = profile.emails[0].value;

    newUser.save(function(err) {
      callback(err, newUser);
    });
  };

  var isAdmin = function(adminEmail, callback) {
    AdminSchema.findOne({
      email: adminEmail,
    }, function(err, admin) {
      return callback(err, admin);
    });
  };

  return {
    insertTestfile: insertTestfile,
    getTestfileById: getTestfileById,
    findUserById: findUserById,
    findOne: findOne,
    saveGoogleUser: saveGoogleUser,
    isAdmin: isAdmin,
  };
};

module.exports = mongoService();
