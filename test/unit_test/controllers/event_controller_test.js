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
        expect(mockResponse.statusCode).to.equal(400);
      });
    });
    describe('Testing sending correct parameters', function() {
      it('should return a valid response if all parameters are correct', function() {
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.not.equal(400);
      });
    });
  });
  describe('Testing /events with GET', function() {
    describe('Testing sending wrong parameters', function() {
      it('should return status 400 if dateFrom is wrong', function() {
        mockRequest.query.dateFrom = '2016-06-18T08Z';
        eventCtrl.get(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if dateTo is wrong', function() {
        mockRequest.query.dateTo = '2016-20-18T08Z';
        eventCtrl.get(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if dateTo is earlier than dateFrom', function() {
        mockRequest.query.dateFrom = '2016-09-18 08:00:00';
        mockRequest.query.dateTo = '2016-02-20 08:00:00';
        eventCtrl.get(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
    });
    describe('Testing sending correct parameters', function() {
      this.timeout(6000);
      it('should return status 200 if the dataFrom-query parameter is correct', function(done) {
        mockRequest.query.dateFrom = '2016-02-18 08:00:00';
        eventCtrl.get(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
        done();
      });
      it('should return status 200 if the dataTo-query parameter is correct', function(done) {
        mockRequest.query.dateTo = '2016-09-18 08:00:00';
        eventCtrl.get(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
        done();
      });
      it('should return status 200 if the dataFrom and dateTo params is correct', function(done) {
        mockRequest.query.dateFrom = '2016-02-18 08:00:00';
        mockRequest.query.dateTo = '2016-09-20 10:10:00';
        eventCtrl.get(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
        done();
      });
    });
  });
});
