/**
 * Created by petersodborgchristensen on 09/05/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var statadmin = require('../../app/controllers/statistikAdmin');

    // operators routes
    app.route('/statistikadmin')
        .get(statadmin.list)
        .post(users.requiresLogin, statadmin.create);

    app.route('/statistikadmin/:statadminId')
        .get(statadmin.read)
        .delete(users.requiresLogin, statadmin.hasAuthorization, statadmin.delete);

    // Finish by binding the statistik middleware
    app.param('statadminId', statadmin.statistikAdminByID);
};