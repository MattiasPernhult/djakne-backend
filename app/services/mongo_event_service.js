// project packages
var EventSchema = require('../schemas/event');

var mongoService = function() {

  var insertEvent = function(eventToAdd, callback) {
    var newEvent = new EventSchema(eventToAdd);
    newEvent.save(function(err, event) {
      if (err) {
        return callback(err, null);
      }
      var r = {
        result: {
          id: event._id,
        },
      };
      return callback(null, r);
    });
  };

  var getEvents = function(query, callback) {
    EventSchema.find(query, function(err, events) {
      return callback(err, events);
    });
  };

  return {
    insertEvent: insertEvent,
    getEvents: getEvents,
  };
};

module.exports = mongoService();
