var chai = require('chai');
var expect = chai.expect;
var Coffee = require('../../../app/models/coffee_model');


describe('Testing coffee model', function() {

  describe('Testing title', function() {
    it('Should return "Kaffe" when adding "Kaffe"', function() {
        var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image','www.djakne.se');
        expect(coffee.title).to.equal('Kaffe');
      });
    it('should return "undefined" when adding "undefined"', function() {
          var coffee = new Coffee(undefined, 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image','www.djakne.se');
          expect(coffee.title).to.equal(undefined);
        });
    it('should return "undefined" when adding 45', function() {
          var coffee = new Coffee(45, 'Gott kaffe!', '2016-06-18 08:00:00',
          '2016-06-23 08:00:00', 'www.djakne.se/image',
          'www.djakne.se');
          expect(coffee.title).to.equal(undefined);
        });
  });
  describe('Testing description', function() {
        it('Should return "Gott kaffe!" when adding "Gott kaffe!"', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image','www.djakne.se');
          expect(coffee.description).to.equal('Gott kaffe!');
        });
        it('Should return "undefined" when adding "undefined"', function() {
          var coffee = new Coffee('Kaffe', undefined,
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image','www.djakne.se');
          expect(coffee.description).to.equal(undefined);
        });
        it('Should return "undefined" when adding 70', function() {
          var coffee = new Coffee('Kaffe', 70,
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image', 'www.djakne.se');
          expect(coffee.description).to.equal(undefined);
        });
      });
  describe('Testing startDate', function() {
        it('Should return "2016-06-18 08:00:00" adding "2016-06-18 08:00:00"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18 08:00:00', '2016-06-23 08:00:00',
              'www.djakne.se/image', 'www.djakne.se');
            expect(coffee.startDate).to.equal('2016-06-18 08:00:00');
          });
        it('Should return "undefined" when adding 20',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              20, '2016-06-23 08:00:00', 'www.djakne.se/image',
              'www.djakne.se');
            expect(coffee.startDate).to.equal(undefined);
          });
        it('Should return "undefined" when adding "undefined"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              undefined, '2016-06-23 08:00:00', 'www.djakne.se/image',
              'www.djaken.se');
            expect(coffee.startDate).to.equal(undefined);
          });
        it('Should return "undefined" when adding "hej"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              'hej', '2016-06-23 08:00:00', 'www.djakne.se/image',
              'www.djakne.se');
            expect(coffee.startDate).to.equal(undefined);
          });
      });

  describe('Testing endDate', function() {
  it('Should return "2016-06-23 08:00:00" when adding "2016-06-23 08:00:00"',
        function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18 08:00:00', '2016-06-23 08:00:00',
              'www.djakne.se/image','www.djakne.se');
          expect(coffee.endDate).to.equal('2016-06-23 08:00:00');
        });
  it('Should return "undefined" when adding 20', function() {
      var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '20', 'www.djakne.se/image',
            'www.djakne.se');
      expect(coffee.endDate).to.equal(undefined);
    });
  it('Should return "undefined" when adding "undefined"', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', undefined, 'www.djakne.se/image',
            'www.djakne.se');
          expect(coffee.endDate).to.equal(undefined);
        });
  it('Should return "undefined" when adding "hej"', function() {
    var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', 'hej', 'www.djakne.se/image',
            'www.djakne.se');
    expect(coffee.endDate).to.equal(undefined);
  });
});

  describe('Testing image url', function() {
    it('Should return "www.djakne.se/image" when adding "www.djakne.se/image"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18 08:00:00', '2016-06-23 08:00:00',
              'www.djakne.se/image', 'www.djakne.se');
            expect(coffee.image).to.equal('www.djakne.se/image');
          });
    it('Should return "undefined" when adding undefined', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00', undefined,
            'www.djakne.se');
          expect(coffee.image).to.equal(undefined);
        });
    it('Should return "undefined" when adding hej', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00', 'hej',
            'www.djakne.se');
          expect(coffee.image).to.equal(undefined);
        });
    it('Should return "undefined" when adding 45', function() {
      var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00', 45,
            'www.djakne.se');
      expect(coffee.image).to.equal(undefined);
    });
  });
  describe('Testing  url', function() {
    it('Should return "www.djakne.se" when adding www.djakne.se',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18 08:00:00', '2016-06-23 08:00:00',
              'www.djakne.se/image', 'www.djakne.se');
            expect(coffee.webpage).to.equal('www.djakne.se');
          });
    it('Should return "undefined" when adding undefined', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image', undefined);
          expect(coffee.webpage).to.equal(undefined);
        });
    it('Should return "undefined" when adding hej', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image','hej');
          expect(coffee.webpage).to.equal(undefined);
        });
    it('Should return "undefined" when adding 20', function() {
      var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18 08:00:00', '2016-06-23 08:00:00',
            'www.djakne.se/image', 20);
      expect(coffee.webpage).to.equal(undefined);
    });
  });
});
