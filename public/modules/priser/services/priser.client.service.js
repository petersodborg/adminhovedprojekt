/**
 * Created by petersodborgchristensen on 07/05/2016.
 */
'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('priser').factory('Priser', ['$resource',
    function($resource) {
        return $resource('priser/:prisId', {
            prisId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);