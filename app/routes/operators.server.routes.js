'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

	var users = require('../../app/controllers/users');
	var operators = require('../../app/controllers/operators');

	// operators routes
	app.route('/operators')
		.get(operators.list)
		.post(users.requiresLogin, operators.create)
		.delete(users.requiresLogin, operators.hasAuthorization, operators.delete);


	app.route('/operators/:operatorId')
		.get(operators.read)
		.put(users.requiresLogin, operators.hasAuthorization, operators.update)
		.delete(users.requiresLogin, operators.hasAuthorization, operators.delete);

	app.route('/operators/:page')
		.get(operators.operatorList);

	// Finish by binding the operator middleware
	app.param('operatorId', operators.operatorByID);
};
