/**
 * Created by petersodborgchristensen on 08/05/2016.
 */


'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var aktivitet = require('../../app/controllers/aktivitet');

    // operators routes
    app.route('/aktiviteter')
        .get(aktivitet.list)
        .post(users.requiresLogin, aktivitet.create);

    app.route('/aktiviteter/:aktivitetId')
        .get(aktivitet.read)
        .put(users.requiresLogin, aktivitet.hasAuthorization, aktivitet.update)
        .delete(users.requiresLogin, aktivitet.hasAuthorization, aktivitet.delete);

    app.route('/aktiviteter/:page')
        .get(aktivitet.aktivitetList);

    // Finish by binding the statistik middleware
    app.param('aktivitetId', aktivitet.aktivitetByID);
};
