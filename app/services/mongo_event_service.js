// project packages
var EventSchema = require('../schemas/event').Event;
var UserSchema = require('../schemas/event').User;
var CommentSchema = require('../schemas/event').Comment;

var mongoService = function() {

  var addCommentToEvent = function(parameters, done) {
    var comment = {
      firstName: parameters.userFirstname,
      lastName: parameters.userLastname,
      memberId: parameters.userId,
      comment: parameters.comment,
    };
    var newComment = new CommentSchema(comment);
    EventSchema.findOneAndUpdate({
      _id: parameters.eventId,
    }, {
      $push: {
        comments: newComment,
      },
    }, {
      new: true,
    }, function(err, updatedEvent) {
      console.log(err);
      console.log(updatedEvent);
      if (err) {
        return done({status: 500, error: 'Problem when performing querying the database'}, null);
      }
      if (!updatedEvent) {
        return done({status: 400, error: 'The request event doesn\'t exists'}, null);
      }
      return done(err, updatedEvent);
    });
  };

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

  var registerForEvent = function(user, eventId, callback) {
    var newUser = new UserSchema(user);
    EventSchema.findOneAndUpdate({
      _id: eventId,
      attendantsId: {
        $nin: [user.id]
      },
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
    addCommentToEvent: addCommentToEvent,
  };
};

module.exports = mongoService();
