/**
 * Created by petersodborgchristensen on 06/05/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var brugere = require('../../app/controllers/brugere');

    // annoncer routes
    app.route('/brugere')
        .get(brugere.list);

    app.route('/brugere/:userId')
        .get(brugere.read)
        .put(users.requiresLogin, brugere.hasAuthorization, brugere.update)


    // Finish by binding the operator middleware
    app.param('userId', brugere.userByID);
};