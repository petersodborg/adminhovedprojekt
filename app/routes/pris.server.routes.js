/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

    var users = require('../../app/controllers/users');
    var pris = require('../../app/controllers/pris');

    // operators routes
    app.route('/priser')
        .get(pris.list)
        .post(users.requiresLogin, pris.create);

    app.route('/priser/:prisId')
        .get(pris.read)
        .put(users.requiresLogin, pris.hasAuthorization, pris.update)
        .delete(users.requiresLogin, pris.hasAuthorization, pris.delete);

    // Finish by binding the statistik middleware
    app.param('prisId', pris.prisByID);
};
