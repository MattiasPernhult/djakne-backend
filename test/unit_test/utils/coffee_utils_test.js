var chai = require('chai');
var expect = chai.expect;
var coffeeValidator = require('../../../app/utils/coffee_validator');

describe('Testing validator', function() {
  describe('Testing the hasMinLength function', function() {
    it('should pass with several inputs', function() {
      expect(coffeeValidator.hasMinLength('Hello', 0)).to.equal(true);
      expect(coffeeValidator.hasMinLength('Hello', 5)).to.equal(true);
      expect(coffeeValidator.hasMinLength('Hello', 6)).to.equal(false);

      expect(coffeeValidator.hasMinLength(undefined, 5)).to.equal(false);
      expect(coffeeValidator.hasMinLength(null, 5)).to.equal(false);
      expect(coffeeValidator.hasMinLength('Hello', undefined)).to.equal(false);

      expect(coffeeValidator.hasMinLength(789, 5)).to.equal(false);
      expect(coffeeValidator.hasMinLength('Hello', '5')).to.equal(false);

      expect(coffeeValidator.hasMinLength({title: 'Hello'}, '5')).to.equal(false);
      expect(coffeeValidator.hasMinLength(['Hello'], '5')).to.equal(false);
    });
  });
  describe('Testing the isString function', function() {
    it('should pass with several inputs', function() {
      expect(coffeeValidator.isString('Hello')).to.equal(true);
      expect(coffeeValidator.isString(undefined)).to.equal(false);
      expect(coffeeValidator.isString(890)).to.equal(false);
    });
  });
  describe('Testing the isDate function', function() {
    it('should pass with several inputs', function() {
      expect(coffeeValidator.isDate('2016-06-18 08:00:00')).to.not.equal(null);
      expect(coffeeValidator.isDate('Hello')).to.equal(null);
      expect(coffeeValidator.isDate('2016-06-18')).to.equal(null);
      expect(coffeeValidator.isDate('08:00:00')).to.equal(null);

      expect(coffeeValidator.isDate(undefined)).to.equal(false);
      expect(coffeeValidator.isDate(null)).to.equal(false);
      expect(coffeeValidator.isDate(890)).to.equal(false);
      expect(coffeeValidator.isDate({message: 'Hejsan'})).to.equal(false);
    });
  });
});
