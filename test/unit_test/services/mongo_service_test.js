var mongoService = require('../../../app/services/mongo_event_service');
var auth = require('../../../app/config/auth');
var EventModel = require('../../../app/models/event_model');

var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
// mongoose.connect(auth.mongoConnection);


describe('Mongoservice for events', function() {
  describe('Testing to insert events', function() {
    it('should return an id after inserting an event', function(done) {
      var newEvent = new EventModel('Lunch', 'Lunch på Subway', 'Lars', '2016-06-18 09:00:00');
      mongoService.insertEvent(newEvent, function(err, response) {
        expect(response).to.have.keys('result');
        done();
      });
    });
  });
  describe('Testing to get events', function() {
    it('should return an event after inserting an event', function(done) {
      var dateFrom = new Date('2016-01-17 09:00:00');
      var dateTo = new Date('2016-06-19 14:00:00');
      var query = {
        date: {
          $gte: dateFrom,
          $lt: dateTo,
        },
      };
      mongoService.getEvents(query, function(err, response) {
        expect(response).to.have.length.above(0);
        done();
      });
    });
  });
});
