var expect = ('chai').expect;
var Coffee = require('../../../app/models/coffee_model');

describe('Testing coffee modell', function() {

  describe('Testing title', function() {
    it('Should return "Kaffe" when adding "Kaffe"', function() {
        var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
        expect(coffee.title).to.equal('Kaffe');
      });
    it('should return "undefined" when adding "undefined"', function() {
          var coffee = new Coffee(undefined, 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.title).to.equal(undefined);
        });
    it('should return "undefined" when adding 45', function() {
          var coffee = new Coffee(45, 'Gott kaffe!', '2016-06-18T08:00',
          '2016-06-18T08:00', 'www.djakne.se/image', 'www.djaken.se', '1,2,3');
          expect(coffee.title).to.equal(undefined);
        });
  });
  describe('Testing description', function() {
        it('Should return "Gott kaffe!" when adding "Gott kaffe!"', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.description).to.equal('Gott');
        });
        it('Should return "undefined" when adding "undefined"', function() {
          var coffee = new Coffee('Kaffe', undefined,
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.description).to.equal(undefined);
        });
        it('Should return "undefined" when adding 70', function() {
          var coffee = new Coffee('Kaffe', 70,
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.description).to.equal(undefined);
        });
      });
  describe('Testing startDate', function() {
        it('Should return "2016-06-18T08:00" when adding "2016-06-18T08:00"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.startDate).to.equal('2016-06-18T08:00');
          });
        it('Should return "undefined" when adding 20',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              20, '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.startDate).to.equal(undefined);
          });
        it('Should return "undefined" when adding "undefined"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              undefined, '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.startDate).to.equal(undefined);
          });
        it('Should return "undefined" when adding "hej"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              'hej', '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.startDate).to.equal(undefined);
          });
      });

  describe('Testing endDate', function() {
        it('Should return "2016-06-18T08:00" when adding "2016-06-18T08:00"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.endDate).to.equal('2016-06-18T08:00');
          });
        it('Should return "undefined" when adding 20', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '20', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
        it('Should return "undefined" when adding "undefined"', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', undefined, 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
        it('Should return "undefined" when adding "hej"', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', 'hej', 'www.djakne.se/image',
            'www.djaken.se', '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
      });

  describe('Testing image url', function() {
    it('Should return "www.djakne.se/image" when adding "www.djakne.se/image"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.endDate).to.equal('www.djakne.se/image');
          });
    it('Should return "undefined" when adding undefined', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', undefined,
            'www.djaken.se', '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
    it('Should return "undefined" when adding hej', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'hej',
            'www.djaken.se', '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
    it('Should return "undefined" when adding 45', function() {
      var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 45,
            'www.djaken.se', '1,2,3');
      expect(coffee.endDate).to.equal(undefined);
    });
  });
  describe('Testing  url', function() {
    it('Should return "www.djakne.se" when adding "www.djakne.se"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.endDate).to.equal('www.djakne.se');
          });
    it('Should return "undefined" when adding undefined', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            undefined, '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
    it('Should return "undefined" when adding hej', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'hej', '1,2,3');
          expect(coffee.endDate).to.equal(undefined);
        });
    it('Should return "undefined" when adding 45', function() {
      var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            45, '1,2,3');
      expect(coffee.endDate).to.equal(undefined);
    });
  });
  describe('Testing  vote', function() {
    it('Should return "1,2,3" when adding "1,2,3"',
          function() {
            var coffee = new Coffee('Kaffe', 'Gott kaffe!',
              '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
              'www.djaken.se', '1,2,3');
            expect(coffee.endDate).to.equal('1,2,3');
          });
    it('Should return "undefined" when adding undefined', function() {
          var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djakne.se', undefined);
          expect(coffee.endDate).to.equal(undefined);
        });
    it('Should return "undefined" when adding 45', function() {
      var coffee = new Coffee('Kaffe', 'Gott kaffe!',
            '2016-06-18T08:00', '2016-06-18T08:00', 'www.djakne.se/image',
            'www.djakne.se', 45);
      expect(coffee.endDate).to.equal(undefined);
    });
  });
});
