var mysqlService = require('./mysql_service');
var gcm = require('node-gcm');
var auth = require('../config/auth');
var sender = new gcm.Sender(auth.gcm);

var service = function() {

  var notifyAllAttendants = function(title, ids) {
    console.log(title);
    console.log(ids);
    mysqlService.getPushTokensByIds(ids, function(err, pushTokens) {
      if (err) {
        console.log('--------- ERROR ---------');
        console.log(err);
        console.log('-------------------------');
        return;
      }

      var correctPushTokens = [];

      for (var i = 0; i < pushTokens.length; i++) {
        var pushToken = pushTokens[i];
        correctPushTokens.push(pushToken.token);
      }

      console.log('Korrekta push tokens');
      console.log(correctPushTokens);

      var gcmMessage = new gcm.Message({
        data: {message: 'New comment for the event: ' + title},
      });

      /**
       * Params: message-literal, registrationIds-array, No. of retries, callback-function
       **/
      sender.send(gcmMessage, {registrationTokens: correctPushTokens}, 4, function(err, result) {
        console.log(err);
        console.log(result);
      });
    });
  };

  return {
    notifyAllAttendants: notifyAllAttendants,
  };
};

module.exports = service();
