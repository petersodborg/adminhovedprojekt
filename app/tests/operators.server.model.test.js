'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Operator = mongoose.model('Operator');

/**
 * Globals
 */
var user, operator;

/**
 * Unit tests
 */
describe('Operator Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      operator = new Operator({
        operatorNavn: 'operator navn titel',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return operator.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without operatorNavn', function(done) {
      operator.operatorNavn = '';

      return operator.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Operator.remove().exec();
    User.remove().exec();
    done();
  });
});
