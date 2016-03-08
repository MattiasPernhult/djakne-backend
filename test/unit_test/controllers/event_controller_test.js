var eventCtrl = require('../../../app/controllers/event_controller');
var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
// chai.should();
// chai.use(chaiAsPromised);

describe('Testing the event controller', function() {
  // TODO: Add tests for the event controller
  var mockRequest;
  var mockResponse;

  beforeEach(function() {
    mockRequest = {
      body: {
        title: 'Lunch',
        text: 'Maten',
        author: 'Lasse',
        date: '2016-06-18T08:00:00.000Z',
      },
    };

    mockResponse = {
      statusCode: null,
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

  describe('Testing /events POST', function() {
    describe('Testing values for title', function() {
      it('should return status 400 if title is too short', function(done) {
        mockRequest.body.title = 'H';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
        done();
      });
      it('should return status 400 if title is a number', function(done) {
        mockRequest.body.title = 23;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
        done();
      });
      it('should return status 400 if title is undefined', function(done) {
        mockRequest.body.title = undefined;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
        done();
      });
      it('should return status 400 if title is null', function(done) {
        mockRequest.body.title = null;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
        done();
      });
      it('should return status 400 if title is " "', function(done) {
        mockRequest.body.title = '';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
        done();
      });
      it('should return status 200 if title is Lunch', function(done) {
        mockRequest.body.title = 'Lunch';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
        done();
      });
    });
  });
});
