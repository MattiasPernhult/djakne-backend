var expect = require('chai').expect;

var validator = require('../../../app/utils/validator');

describe('Testing validator', function() {
  describe('Testing the hasMinLength function', function() {
    it('should pass with several inputs', function() {
      expect(validator.hasMinLength('Hejsan', 0)).to.equal(true);
      expect(validator.hasMinLength('Hejsan', 6)).to.equal(true);
      expect(validator.hasMinLength('Hejsan', 7)).to.equal(false);

      expect(validator.hasMinLength(undefined, 5)).to.equal(false);
      expect(validator.hasMinLength(null, 5)).to.equal(false);
      expect(validator.hasMinLength('Hejsan', undefined)).to.equal(false);

      expect(validator.hasMinLength(789, 5)).to.equal(false);
      expect(validator.hasMinLength('Hejsan', '5')).to.equal(false);

      expect(validator.hasMinLength({title: 'Hejsan'}, '5')).to.equal(false);
      expect(validator.hasMinLength(['Hejsan'], '5')).to.equal(false);
    });
  });

  describe('Testing the isString function', function() {
    it('should pass with several inputs', function() {
      expect(validator.isString('Hejsan')).to.equal(true);
      expect(validator.isString(undefined)).to.equal(false);
      expect(validator.isString(890)).to.equal(false);
    });
  });

  describe('Testing the isDate function', function() {
    it('should pass with several inputs', function() {
      expect(validator.isDate('2016-06-18 08:00:00')).to.not.equal(null);
      expect(validator.isDate('Hejsan')).to.equal(null);
      expect(validator.isDate('2016-06-18')).to.equal(null);
      expect(validator.isDate('08:00:00')).to.equal(null);

      expect(validator.isDate(undefined)).to.equal(false);
      expect(validator.isDate(null)).to.equal(false);
      expect(validator.isDate(890)).to.equal(false);
      expect(validator.isDate({message: 'Hejsan'})).to.equal(false);
    });
  });
});
