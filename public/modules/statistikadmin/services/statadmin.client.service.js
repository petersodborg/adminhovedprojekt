/**
 * Created by petersodborgchristensen on 09/05/2016.
 */
'use strict';

//Articles service used for communicating with the operators REST endpoints
angular.module('statistikadmin').factory('StatistikAdmin', ['$resource',
    function($resource) {
        return $resource('statistikadmin/:statadminId', {
            statadminId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);