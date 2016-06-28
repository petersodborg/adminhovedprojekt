'use strict';

// Setting up route
angular.module('operators').config(['$stateProvider',
	function($stateProvider) {
		// Operators state routing
		$stateProvider.
		state('listOperators', {
			url: '/operators',
			templateUrl: 'modules/operators/views/list-operators.client.view.html'
		}).
		state('createOperator', {
			url: '/operators/create',
			templateUrl: 'modules/operators/views/create-operator.client.view.html'
		}).
		state('viewOperator', {
			url: '/operators/:operatorId',
			templateUrl: 'modules/operators/views/view-operator.client.view.html'
		}).
		state('editOperator', {
			url: '/operators/:operatorId/edit',
			templateUrl: 'modules/operators/views/edit-operator.client.view.html'
		});
	}
]);