/**
 * Created by petersodborgchristensen on 08/05/2016.
 */

'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('lande').factory('Lande', ['$resource',
    function($resource) {
        return $resource('lande/:landId', {
            landId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
