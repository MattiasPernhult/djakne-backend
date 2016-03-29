var db = require('../../app/config/mysql');
var mysql = require('mysql');

module.exports = {
  getByLinkedInId: function(linkedInId) {
    return db.query(mysql.format('SELECT * FROM `member` WHERE  `linkedIn` = ? LIMIT 1', [linkedInId]), true);
  },
  storePushToken: function(memberId, token, type) {
    db.query(mysql.format('SELECT token FROM memberPushTokens WHERE member_id = ?', [memberId]), true)
      .then(function(data) {
        if (data) {
          db.query(mysql.format('UPDATE memberPushTokens SET token = ?, type = ? WHERE member_id = ?', [token, type, memberId]));
        } else {
          db.query(mysql.format('INSERT INTO memberPushTokens (member_id, token, type) VALUES(?, ?, ?)', [memberId, token, type]));
        }
      });
  },
  getPushToken: function(memberId) {
    return db.query(mysql.format('SELECT token, type FROM memberPushTokens WHERE member_id = ?', [memberId]), true);
  },
  storeLinkedinToken: function(memberId, token) {
    db.query(mysql.format('UPDATE `member` SET appToken = ? WHERE id = ?', [token, memberId]));
  },
  getByLinkedInToken: function(token) {
    console.log('ska skicka query');
    return db.query(mysql.format('SELECT * FROM `member` WHERE appToken = ?', [token]), true);
  },
  getByMemberId: function(memberId) {
    return db.query(mysql.format('SELECT * FROM `member` WHERE  id = ? LIMIT 1', [memberId]), true);
  },
  getByEmail: function(email) {
    return db.query(mysql.format('SELECT * FROM `member` WHERE reqMail = ? LIMIT 1', [email]), true);
  },
};
