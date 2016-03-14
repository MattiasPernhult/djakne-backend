var expect = require('chai').expect;

var Event = require('../../../app/models/event_model');

describe('Testing the event model', function() {

  describe('Testing title attribute', function() {
    it('should return "Hackaton" when adding "Hackaton"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', '2016-06-18T08:00');
      expect(event.title).to.equal('Hackaton');
    });

    it('should return undefined when passing undefined', function() {
      var event = new Event(undefined, 'Hackaton på Djäkne', 'Lasse', '2016-06-18T08:00');
      expect(event.title).to.equal(undefined);
    });

    it('should return undefined when passing 89', function() {
      var event = new Event(89, 'Hackaton på Djäkne', 'Lasse', '2016-06-18T08:00');
      expect(event.title).to.equal(undefined);
    });
  });

  describe('Testing text attribute', function() {
    it('should return "Hackaton på Djäkne" when adding "Hackaton på Djäkne"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', '2016-06-18T08:00');
      expect(event.text).to.equal('Hackaton på Djäkne');
    });

    it('should return undefined when passing undefined', function() {
      var event = new Event('Hackaton', undefined, 'Lasse', '2016-06-18T08:00');
      expect(event.text).to.equal(undefined);
    });

    it('should return undefined when passing 89', function() {
      var event = new Event('Hackaton', 89, 'Lasse', '2016-06-18T08:00');
      expect(event.text).to.equal(undefined);
    });
  });

  describe('Testing author attribute', function() {
    it('should return "Lasse" when adding "Lasse"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', '2016-06-18T08:00');
      expect(event.author).to.equal('Lasse');
    });

    it('should return "Bo" when adding "Bo"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Bo', '2016-06-18T08:00');
      expect(event.author).to.equal('Bo');
    });

    it('should return undefined when passing undefined', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', undefined, '2016-06-18T08:00');
      expect(event.author).to.equal(undefined);
    });

    it('should return undefined when passing 89', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', undefined, '2016-06-18T08:00');
      expect(event.author).to.equal(undefined);
    });
  });

  describe('Testing date attribute', function() {
    it('should return "2016-06-18 08:00:00" when adding "2016-06-18 08:00:00"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', '2016-06-18 08:00:00');
      expect(event.date).to.equal('2016-06-18 08:00:00');
    });

    it('should return undefined when adding "2016-06-18"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', '2016-06-18');
      expect(event.date).to.equal(undefined);
    });

    it('should return undefined when adding "2016-06-18 08:00"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', '2016-06-18 08:00');
      expect(event.date).to.equal(undefined);
    });

    it('should return undefined when adding "Hackaton"', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', 'Hackaton');
      expect(event.date).to.equal(undefined);
    });

    it('should return undefined when passing undefined', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', undefined);
      expect(event.date).to.equal(undefined);
    });

    it('should return undefined when passing 89', function() {
      var event = new Event('Hackaton', 'Hackaton på Djäkne', 'Lasse', 89);
      expect(event.date).to.equal(undefined);
    });
  });
});
