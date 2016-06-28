/**
 * Created by petersodborgchristensen on 08/05/2016.
 */


'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('aktiviteter').factory('Aktiviteter', ['$resource',
    function($resource) {
        return $resource('aktiviteter/:aktivitetId', {
            aktivitetId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
