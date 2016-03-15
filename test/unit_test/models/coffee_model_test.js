var expect = ('chai').expect;
var Coffee = require('../../../app/models/coffee_model');

describe('Testing coffee modell', function() {

  describe('Testing title attribute', function() {
    it('Should return "Kaffe" when adding "Kaffe"', function() {
        var coffee = new Coffee('Kaffe', 'Gott',
        '2016-06-18T08:00', '2016-06-18T08:00');
        expect(coffee.title).to.equal('Kaffe');
      });
    it('should return "undefined" when adding "undefined"', function() {
        var coffee = new Coffee(undefined, 'Gott',
        '2016-06-18T08:00', '2016-06-18T08:00');
        expect(coffee.title).to.equal(undefined);
      });
    it('should return "undefined" when adding 45', function() {
      var coffee = new Coffee(45, 'Gott',
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.title).to.equal(undefined);
    });
  });
  describe('Testing text attribute adding "Gott"', function() {
    it('Should return "Gott" when adding "Gott"', function() {
      var coffee = new Coffee('Kaffe','Gott',
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.description).to.equal('Gott');
    });
    it('Should return "undefined" when adding "undefined"', function() {
      var coffee = new Coffee('Kaffe',undefined,
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.description).to.equal(undefined);
    });
    it('Should return "undefined" when adding 70', function() {
      var coffee = new Coffee('Kaffe',70,
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.description).to.equal(undefined);
    });
  });
  describe('Testing "stardate" when adding "startdate"', function() {
    it('Should return "2016-06-18T08:00" when adding "2016-06-18T08:00"',
      function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.stardate).to.equal('2016-06-18T08:00');
    });
    it('Should return "undefined" when adding 20',
      function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      20, '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
    it('Should return "undefined" when adding "undefined"',
      function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      undefined, '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
    it('Should return "undefined" when adding "hej"',
      function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      'hej', '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
  });
  describe('Testing "endDate" when adding "endDate"', function() {
    it('Should return "2016-06-18T08:00" when adding "2016-06-18T08:00"',
      function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.stardate).to.equal('2016-06-18T08:00');
    });
    it('Should return "undefined" when adding 20', function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
    it('Should return "undefined" when adding "undefined"', function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
    it('Should return "undefined" when adding "hej"', function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
  });
  describe('Testing "djakneID" when adding "djakneID"', function() {
    it('Should return "ID01" when adding "ID01"',
      function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00', '2016-06-18T08:00');
      expect(coffee.stardate).to.equal('ID01');
    });
    it('Should return "undefined" when adding undefinde', function() {
      var coffee = new Coffee('Kaffe', 'Gott',
      '2016-06-18T08:00');
      expect(coffee.stardate).to.equal(undefined);
    });
  });
});
