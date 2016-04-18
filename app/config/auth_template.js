var auth = {};
auth.google = {
  clientId: '<id>',
  projectId: '<ferrous-module>',
  authUri: '<url>',
  tokenUi: '<url>',
  authProviderX509CertUrl: '<url>',
  clientSecret: '<key>',
  redirectUris: '<localhost>',
};

auth.mongoUrl = 'your_host:port';
auth.mongoConnection = 'mongodb://' + auth.mongoUrl + '/djakne';

auth.slack = '<slack_web_hook>';

auth.mysql = {
  host: '<host>',
  port: '<port>',
  user: '<user>',
  password: '<password>',
  database: '<database>',
};

module.exports = auth;
