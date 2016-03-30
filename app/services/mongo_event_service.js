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

  var registerForEvent = function(userId, eventId, callback) {
    EventSchema.findOneAndUpdate({
      _id: eventId,
    }, {
      $addToSet: {
        attendee: userId,
      },
    }, function(err, updatedEvent) {
      console.log(err);
      return callback(err, updatedEvent);
    });
  };

  return {
    insertEvent: insertEvent,
    getEvents: getEvents,
    registerForEvent: registerForEvent,
  };
};

module.exports = mongoService();
