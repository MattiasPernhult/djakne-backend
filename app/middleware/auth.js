var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');

var mysqlService = require('../services/mysql_service');
var calendarService = require('../services/calendar_service');

var credentials = require('../config/client_secret.json');

var auth = {};

var clientSecret = credentials.installed.clientSecret;
var clientId = credentials.installed.clientId;
var redirectUrl = credentials.installed.redirectUris[0];
var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

auth.requiresLogin = function(req, res, next) {
  var token = req.body.token;
  if (!token) {
    return res.status(400).send({message: 'Missing token'});
  }
  mysqlService.getUserByLinkedInToken(token, function(err, userid) {
    if (!userid || userid.length === 0) {
      return res.status(400).send({message: 'Invalid token or user not found'});
    }
    req.body.userID = String(userid[0].id);
    next();
  });
};

auth.requireCalendarLogin = function(req, res, next) {
  fs.readFile('../config/calendar_token.json', function(err, token) {
    if (err) {
      return res.status(500).send({message: 'Internal Server Error'});
    }
    oauth2Client.credentials = JSON.parse(token);
    next(oauth2Client);
  });
};

module.exports = auth;
