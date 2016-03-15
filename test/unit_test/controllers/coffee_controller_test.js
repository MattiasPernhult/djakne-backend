var coffeCtrl = require('../../../app/controllers/coffee_controller');
var chai = require('chai');
var expect = chai.expect;
chai.should();
describe('Testing the event controller', function() {
  var mockRequest;
  var mockResponse;

  beforeEach(function() {
    mockRequest = {
      body: {
        title: 'Kaffe',
        text: 'Gott kaffe',
        startDate: '2016-06-18 08:00:00.000',
        endDate: '2016-06-18 08:00:00.000',
        djakneId: 'ID01',
        avarageVotes: 1,
        voteOne: 1,
        voteTwo: 1,
        voteThree: 1,
        voteFour: 1,
        voteFive: 1,
      },
      query: { },
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

  describe('Testing /coffe POST', function() {
    describe('Testing values for title', function() {
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
  describe('Testing /current coffe GET', function() {
    it('Should return status 400 if date is correct', function() {
      mockRequest.query.date = '2016-06-18 08:00:00.000';
      coffeCtrl.get(mockRequest, mockResponse);
      expect(mockResponse.statusCode).to.equal(400);
    });
    it('"json"', function() {
      mockRequest.query = 'json';
      var response = 'mock result from services';
      return coffeCtrl.get(mockRequest, mockResponse).should.equal(response);
    });
  });
});
