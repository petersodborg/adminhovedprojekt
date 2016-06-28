/**
 * Created by petersodborgchristensen on 05/05/2016.
 */
'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('brugere').factory('Brugere', ['$resource',
    function($resource) {
        return $resource('brugere/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);