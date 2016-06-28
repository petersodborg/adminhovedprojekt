/**
 * Created by petersodborgchristensen on 08/05/2016.
 */

'use strict';

// Setting up route
angular.module('lande').config(['$stateProvider',
    function($stateProvider) {
        // Annonce state routing
        $stateProvider.
        state('listlande', {
            url: '/lande',
            templateUrl: 'modules/lande/views/list-lande.client.view.html'
        }).
        state('createlande', {
            url: '/lande/create',
            templateUrl: 'modules/lande/views/create-land.client.view.html'
        }).
        state('viewlande', {
            url: '/lande/:landId',
            templateUrl: 'modules/lande/views/list-lande.client.view.html'
        }).
        state('editlande', {
            url: '/lande/:landId/edit',
            templateUrl: 'modules/lande/views/edit-land.client.view.html'
        });;

    }
]);
