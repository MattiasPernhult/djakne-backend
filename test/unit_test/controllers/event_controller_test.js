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
        date: '2016-06-18T08:00:00.000Z',
      },
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

  describe('Testing /events POST', function() {
    describe('Testing values for title', function() {
      it('should return status 400 if title is too short', function() {
        mockRequest.body.title = 'H';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is a number', function() {
        mockRequest.body.title = 23;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is undefined', function() {
        mockRequest.body.title = undefined;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is null', function() {
        mockRequest.body.title = null;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is " "', function() {
        mockRequest.body.title = '';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if title is Lunch', function() {
        mockRequest.body.title = 'Lunch';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
    describe('Testing values for text', function() {
      it('should return status 400 if text is too short', function() {
        mockRequest.body.text = 'E';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is a number', function() {
        mockRequest.body.text = 23;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is undefined', function() {
        mockRequest.body.text = undefined;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is null', function() {
        mockRequest.body.text = null;
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is " "', function() {
        mockRequest.body.text = '';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if text is Lunch', function() {
        mockRequest.body.text = 'Lunch på restaurangen';
        eventCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
  });
});
