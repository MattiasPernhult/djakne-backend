var mysqlService = require('./mysql_service');
var gcm = require('node-gcm');
var auth = require('../config/auth');
var sender = new gcm.Sender(auth.gcm);

var service = function() {

  var notifyAllAttendants = function(title, userId, ids) {
    for (var j = 0; j < ids.length; j++) {
      var id = ids[j];
      if (userId === Number(id)) {
        ids.splice(j, 1);
      }
    }
    if (ids.length === 0) {
      console.log('No id in ids array');
      console.log('No id to send push notification to');
      return;
    }
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
        notification: {
          title: 'Djäkne',
          sound: 'default',
          icon: 'img/Icons/home/coffee_black.png',
          body: 'New comment for the event: ' + title,
        },
      });

      sender.send(gcmMessage, {
        registrationTokens: correctPushTokens,
      }, 4, function(err, result) {
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
