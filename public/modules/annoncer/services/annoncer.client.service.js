'use strict';

//annonce service used for communicating with the annonce REST endpoints
angular.module('annoncer').factory('Annoncer', ['$resource',
    function($resource) {
        return $resource('annoncer/:annonceId', {
            annonceId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]).filter('approved', function() {
    return function(input) {
        if(input == 'ja'){
            return "glyphicon glyphicon-ok-sign";
        }else if(input == 'status'){
            return "glyphicon glyphicon-remove";
        }
    };
});