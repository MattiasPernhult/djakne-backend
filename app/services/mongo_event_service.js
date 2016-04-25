// project packages
var EventSchema = require('../schemas/event').Event;
var UserSchema = require('../schemas/event').User;

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

  var deleteEvent = function(eventToDelete, callback) {
    EventSchema.remove({ _id: eventToDelete }, function(err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  };

  var getEvents = function(query, callback) {
    EventSchema.find(query).sort({date: 1}).exec(function(err, events) {
      return callback(err, events);
    });
  };

  var registerForEvent = function(user, eventId, callback) {
    var newUser = new UserSchema(user);
    EventSchema.findOneAndUpdate({
      _id: eventId,
      attendantsId: { $nin: [ user.id ] },
    }, {
      $push: {
        attendants: newUser,
        attendantsId: user.id,
      },
    }, {
      new: true,
    }, function(err, event) {
      if (err) {
        return callback(err, null);
      }
      if (!event) {
        var error = {
          message: 'You are already registered for this event',
          status: 400,
        };
        return callback(error, null);
      }
      return callback(err, event);
    });
  };

  return {
    insertEvent: insertEvent,
    getEvents: getEvents,
    registerForEvent: registerForEvent,
    deleteEvent: deleteEvent,
  };
};

module.exports = mongoService();
