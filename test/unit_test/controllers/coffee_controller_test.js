var coffeeCtrl = require('../../../app/controllers/coffee_controller');
var chai = require('chai');
var expect = chai.expect;
chai.should();
describe('Testing the coffee controller', function() {
  describe('Testing /coffe POST', function() {
    var mockRequest;
    var mockResponse;

    beforeEach(function() {
      mockRequest = {
        body: {
          title: 'Kaffe',
          description: 'Gott kaffe!',
          startDate: '2016-06-18 08:00:00',
          endDate: '2016-06-23 08:00:00',
          image: 'www.djakne.se/image',
          webpage: 'www.djakne.se',
          voted: ['1','2','3'],
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
    describe('Testing title', function() {
      it('should return status 400 if title is to short', function() {
        mockRequest.body.title = 'B';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is undefined', function() {
        mockRequest.body.title = undefined;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is a number', function() {
        mockRequest.body.title = 7;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if title is empty', function() {
        mockRequest.body.title = '';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if title is ok', function() {
        mockRequest.body.title = 'Latte';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
    describe('Testing description', function() {
      it('should return status 400 if description is to short', function() {
        mockRequest.body.description = 'B';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if description is undefined', function() {
        mockRequest.body.description = undefined;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if description is a number', function() {
        mockRequest.body.description = 7;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if description is empty', function() {
        mockRequest.body.description = '';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if description is ok', function() {
        mockRequest.body.description = 'description is ok!';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
    describe('Testing startdate', function() {
      it('should return status 400 if startdate is undefined', function() {
        mockRequest.body.startDate = undefined;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if startdate is a number', function() {
        mockRequest.body.startDate = 7;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if startdate is a string of letters',
        function() {
        mockRequest.body.startDate = 'abcdef';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if startdate is empty', function() {
        mockRequest.body.startDate = '';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if startdate is ok', function() {
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
    describe('Testing enddate', function() {
      it('should return status 400 if enddate is undefined', function() {
        mockRequest.body.endDate = undefined;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if enddate is a number', function() {
        mockRequest.body.endDate = 7;
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if enddate is a string of letters',
        function() {
        mockRequest.body.endDate = 'abcdef';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 400 if enddate is empty', function() {
        mockRequest.body.endDate = '';
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(400);
      });
      it('should return status 200 if enddate is ok', function() {
        coffeeCtrl.post(mockRequest, mockResponse);
        expect(mockResponse.statusCode).to.equal(200);
      });
    });
  });
  describe('Testing /current GET', function() {
  });
  describe('Testing /history GET', function() {
  });
  describe('Testing /:id GET', function() {
  });
  describe('Testing /vote PUT', function() {
  });
});
