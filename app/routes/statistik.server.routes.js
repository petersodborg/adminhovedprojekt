/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var statistik = require('../../app/controllers/statistik');

    // operators routes
    app.route('/statistik')
        .get(statistik.list)
        .post(users.requiresLogin, statistik.create);

    app.route('/statistik/:statId')
        .get(statistik.read)
        .delete(users.requiresLogin, statistik.hasAuthorization, statistik.delete);
    // Finish by binding the statistik middleware
    app.param('statId', statistik.statistikByID);
};