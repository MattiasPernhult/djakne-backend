var coffeeCtrl = require('../../../app/controllers/coffee_controller');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../../../app');
chai.should();
chai.use(chaiHttp);

describe('Testing coffee_controller', function() {
  var testID;

  var mockRequest;
  var mockResponse;

  beforeEach(function() {
    mockRequest = {
      body: {
        title: 'Test',
        description: 'Valid description',
        startDate: '2018-06-18 08:00:00',
        endDate: '2018-06-23 08:00:00',
        image: 'www.test.com/image',
        webpage: 'www.test.com',
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
  describe('Testing /coffee POST', function() {
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
    });
    describe('Test all params with valid input', function() {
      it('should respond with 200', function(done) {
        chai.request(server)
            .post('/coffee')
            .send(mockRequest.body)
            .end(function(err, res) {
              testID = res.body.djakneID;
              res.should.have.status(200);
              done();
            });
      });
    });
  });
  describe('Testing /coffee/current GET', function() {
    it('should respond with 200 with correct URL', function(done) {
      chai.request(server)
          .get('/coffee/current')
          .end(function(err, res) {
            done();
            res.should.have.status(200);
            expect(res.body.djakneID).to.equal(testID);
            expect(res.body.title).to.equal(mockRequest.body.title);
            expect(res.body.description).to.equal(mockRequest.body.description);
            expect(res.body.image).to.equal(mockRequest.body.image);
            expect(res.body.webpage).to.equal(mockRequest.body.webpage);

          });
    });
  });
  describe('Testing /coffee/history GET', function() {
    it('should respond with 200 with correct URL', function(done) {
      chai.request(server)
          .get('/coffee/history')
          .end(function(err, res) {
            done();
            res.should.have.status(200);
          });
    });
  });
  describe('Testing /coffee/:id GET', function() {
    it('should respond with 200 with correct URL', function(done) {
      chai.request(server)
          .get('/coffee/' + testID)
          .end(function(err, res) {
            done();
            res.should.have.status(200);
            expect(res.body.djakneID).to.equal(testID);
            expect(res.body.title).to.equal(mockRequest.body.title);
            expect(res.body.description).to.equal(mockRequest.body.description);
            expect(res.body.image).to.equal(mockRequest.body.image);
            expect(res.body.webpage).to.equal(mockRequest.body.webpage);

          });
    });
  });
  describe('Testing /coffee/vote PUT', function() {
    beforeEach(function() {
      req = {
        body: {
          vote: '1',
          userID: '12',
        },
        query: { },
      };
    });
    it('should respond with 200 with correct input', function(done) {
      chai.request(server)
          .put('/coffee/vote')
          .send(req.body)
          .end(function(err, res) {
            done();
            res.should.have.status(200);
          });
    });
    it('should respond with 400 if same userID is used twice', function(done) {
      chai.request(server)
          .put('/coffee/vote')
          .send(req.body)
          .end(function(err, res) {
            done();
            res.should.have.status(400);
          });
    });
    it('should respond with 200 with changed userID', function(done) {
      req.body.vote = '3';
      req.body.userID = '123';
      chai.request(server)
          .put('/coffee/vote')
          .send(req.body)
          .end(function(err, res) {
            done();
            res.should.have.status(200);
          });
    });
    it('should return totalVotes = 2 and averageVotes = 2' , function(done) {
      chai.request(server)
          .get('/coffee/' + testID)
          .end(function(err, res) {
            done();
            res.should.have.status(200);
            expect(res.body.djakneID).to.equal(testID);
            expect(res.body.totalVotes).to.equal(2);
            expect(res.body.averageVotes).to.equal(2);
          });
    });
  });
  describe('Testing /coffee/remove/:id GET', function() {
    it('should respond with 200 with correct URL', function(done) {
      chai.request(server)
          .get('/coffee/remove/' + testID)
          .end(function(err, res) {
            done();
            res.should.have.status(200);
          });
    });
  });
});
