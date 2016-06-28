'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Aktivitet = mongoose.model('Aktivitet');

/**
 * Globals
 */
var user, aktivitet;

/**
 * Unit tests
 */
describe('Aktivitets Model Unit Tests:', function() {
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
      aktivitet = new Aktivitet({
        Title: 'Aktivitet Title',
        TagCategoryID: 'Aktivitet TagCategoryID',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return aktivitet.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function(done) {
      aktivitet.Title = '';

      return aktivitet.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Aktivitet.remove().exec();
    User.remove().exec();
    done();
  });
});
