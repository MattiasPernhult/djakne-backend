var eventCtrl = require('../../../app/controllers/event_controller');
var chai = require('chai');
var expect = chai.expect;

describe('Testing the event controller', function() {
  var mockRequest;
  var mockResponse;

  beforeEach(function() {
    mockRequest = {
      body: {
        title: 'Lunch',
        text: 'Maten',
        author: 'Lasse',
        date: '2016-06-18 08:00:00',
      },
      query: {},
    };

    mockResponse = {
      statusCode: 200,
      result: null,
      status: function(status) {
        this.statusCode = status;
        return this;
      },
      send: function(result) {
        this.result = result;
        return this;
      },
    };
  });

  describe('Testing /events with POST', function() {
    describe('Testing sending wrong parameters', function() {
      it('should return status 400 if title is too short', function() {
        mockRequest.body.title = 'H';
        eventCtrl.post(mockRequest, mockResponse);
        console.log(mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
    });
    describe('Testing sending correct parameters', function() {
      it('should return a valid response if all parameters are correct', function() {
        eventCtrl.post(mockRequest, mockResponse);
        console.log(mockResponse);
        expect(mockResponse.statusCode).to.not.equal(400);
      });
    });
  });
  describe('Testing /events with GET', function() {
    describe('Testing sending wrong parameters', function() {
      it('should return status 400 if the query is wrong', function() {
        mockRequest.query.dateFrom = '2016-06-18T08Z';
        eventCtrl.get(mockRequest, mockResponse);
        console.log(mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
    });
  });
});
