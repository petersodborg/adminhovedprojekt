'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('operators').factory('Operators', ['$resource',
	function($resource) {
		return $resource('operators/:operatorId', {
			operatorId: '@_id',
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).filter('reverse', function() {
	return function(input) {
		if(input == 'ja'){
			return "glyphicon glyphicon-ok-sign";
		}else if(input == 'nej'){
			return "glyphicon glyphicon-remove";
		}
	};
});