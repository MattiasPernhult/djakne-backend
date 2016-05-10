var auth = {};

// MongoDB url to connect to
auth.mongoUrl = '<mongo_url>:<mongo_port>';
// MongoDB connection string to connect to
auth.mongoConnection = 'mongodb://' + auth.mongoUrl + '/<mongo_db>';

// This is a api url to scrap the latest coffeebean
auth.coffeeBeanUrl = '<api_url>';
// Slack hook to post message to a certain channel
auth.slack = '<slack_hook>';

// Credentials to connect to a mysql database
auth.mysql = {
  host: '<host>',
  port: 3306,
  user: '<database_user>',
  password: '<password>',
  database: '<database>',
};

// Google Calendar API key, get this information from the Google Calendar documentation
auth.calendar = {
  calendarId: '',
  type: '',
  projectId: '',
  privateKeyId: '',
  privateKey: '',
  clientEmail: '',
  clientId: '',
  authUri: '',
  tokenUri: '',
  authProviderX509CertUrl: '',
  clientX509CertUrl: '',
};

// WiFi password for the network at djakne
auth.wifiPassword = {
  premium: '<password>',
  member: '<password>',
};

// Google Cloud Messaging API key
auth.gcm = '';

module.exports = auth;
