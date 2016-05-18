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
      userImage: parameters.userImage,
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
      if (err) {
        return done({status: 500, error: 'Problem when performing querying the database'}, null);
      }
      if (!updatedEvent) {
        return done({status: 400, error: 'The request event doesn\'t exists'}, null);
      }
      return done(err, updatedEvent);
    });
  };

  var removeCommentFromEvent = function(parameters, done) {
    EventSchema.findOneAndUpdate({
      _id: parameters.eventId,
    }, {
      $pull: {
        comments: {
          memberId: parameters.userId,
          _id: parameters.commentId,
        },
      },
    }, {
      new: true,
    }, function(err, updatedEvent, test) {
      if (err) {
        return done({status: 500, error: 'Problem when performing querying the database'}, null);
      }
      if (!updatedEvent) {
        return done({status: 400, error: 'The request event doesn\'t exists'}, null);
      }
      for (var i = 0; i < updatedEvent.comments.length; i++) {
        var mongoCommentId = updatedEvent.comments[i]._id.toString();
        if (mongoCommentId === parameters.commentId) {
          return done({status: 400, error: 'You can only remove your own comments'});
        }
      }
      return done(err, updatedEvent);
    });
  };

  var insertEvent = function(eventToAdd, callback) {
    var newEvent = new EventSchema(eventToAdd);
    newEvent.save(function(err, addedEvent) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, addedEvent);
    });
  };

  var deleteEvent = function(parameters, done) {
    EventSchema.findOneAndRemove(
      {
        _id: parameters.eventId,
        author: parameters.userId,
      }, {
        passRawResult: true,
      },
       function(err, doc, result) {
        if (err) {
          return done({status: 500, error: 'Problem when performing querying the database'});
        }
        if (!result) {
          return done({status: 400, error: 'You cannot delete an event you ' +
         'haven\'t created yourself',});
        }
        if (result.value) {
          return done(null);
        }
        return done({status: 400, error: 'Could not delete the requested event'});
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
      attendantsId: {
        $nin: [user.id],
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
    removeCommentFromEvent: removeCommentFromEvent,
    deleteEvent: deleteEvent,
  };
};

module.exports = mongoService();
