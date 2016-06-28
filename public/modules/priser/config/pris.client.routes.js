/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

// Setting up route
angular.module('priser').config(['$stateProvider',
    function($stateProvider) {
        // Annonce state routing
        $stateProvider.
        state('listpriser', {
            url: '/priser',
            templateUrl: 'modules/priser/views/list-priser.client.view.html'
        }).
        state('createpriser', {
            url: '/priser/create',
            templateUrl: 'modules/priser/views/create-pris.client.view.html'
        }).
        state('viewpriser', {
            url: '/priser/:prisId',
            templateUrl: 'modules/priser/views/list-priser.client.view.html'
        }).
        state('editPriser', {
            url: '/priser/:prisId/edit',
            templateUrl: 'modules/priser/views/edit-pris.client.view.html'
        });
    }
]);
