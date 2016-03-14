var coffeCtrl = require('../../../app/controllers/coffee_controller');
var chai = require('chai');
var expect = chai.expect;

describe('Testing the event controller', function() {
  var mockRequest;
  var mockResponse;

  beforeEach(function() {
    mockRequest = {
      body: {
        title: 'Kaffe',
        text: 'Gott kaffe',
        date: '2016-06-18T08:00:00.000Z',
        avarageVotes: 0,
        voteOne: 0,
        voteTwo: 0,
        voteThree: 0,
        voteFour: 0,
        voteFive: 0,
      },
    };

    mockResponse = {
      statusCode: 200,
      result: null,
      status: function(status) {
        this.statusCode = status;
        return this;
      },
      send: function(result) {
        this.result = result;
        return this;
      },
    };
  });

  describe('Testing /events POST', function() {
    describe('Testing values for title', function() {
      it('should return status 400 if title is too short', function() {
        mockRequest.body.title = 'K';
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is a number', function() {
        mockRequest.body.title = 88;
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is undefined', function() {
        mockRequest.body.title = undefined;
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is null', function() {
        mockRequest.body.title = null;
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is " "', function() {
        mockRequest.body.title = '';
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if title is Kaffe', function() {
        mockRequest.body.title = 'Kaffe';
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
    describe('Testing values for text', function() {
      it('should return status 400 if text is too short', function() {
        mockRequest.body.text = 'L';
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is a number', function() {
        mockRequest.body.text = 90;
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is undefined', function() {
        mockRequest.body.text = undefined;
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is null', function() {
        mockRequest.body.text = null;
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if text is " "', function() {
        mockRequest.body.text = '';
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if text is Gott kaffe', function() {
        mockRequest.body.text = 'Gott kaffe';
        coffeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
  });
});
