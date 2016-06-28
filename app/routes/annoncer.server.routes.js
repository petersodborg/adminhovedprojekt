'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var annoncer = require('../../app/controllers/annoncer');
    var lande = require('../../app/controllers/land');

    // annoncer routes
    app.route('/annoncer')
        .get(annoncer.list)
        .post(users.requiresLogin, annoncer.create);

    app.route('/annoncer/:annonceId')
        .get(annoncer.read)
        .put(users.requiresLogin, annoncer.hasAuthorization, annoncer.update)
        .delete(users.requiresLogin, annoncer.hasAuthorization, annoncer.delete);

/*
    app.route('/annoncer/:page')
        .get(annoncer.annoncerList);
*/
    // Finish by binding the operator middleware
    app.param('annonceId', annoncer.annonceByID);
};
