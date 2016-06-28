'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('statistik').factory('Statistikker', ['$resource',
    function($resource) {
        return $resource('statistik/:statId', {
            statId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);