/**
 * Created by petersodborgchristensen on 08/05/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var land = require('../../app/controllers/land');

    // operators routes
    app.route('/lande')
        .get(land.list)
        .post(users.requiresLogin, land.create);

    app.route('/lande/:landId')
        .get(land.read)
        .put(users.requiresLogin, land.hasAuthorization, land.update)
        .delete(users.requiresLogin, land.hasAuthorization, land.delete);

    app.route('/lande/:page')
        .get(land.landeList);

    // Finish by binding the statistik middleware
    app.param('landId', land.landByID);
};
