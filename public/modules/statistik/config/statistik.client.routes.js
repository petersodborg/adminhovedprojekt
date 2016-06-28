/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

// Setting up route
angular.module('statistik').config(['$stateProvider',
    function($stateProvider) {
        // Annonce state routing
        $stateProvider.
        state('listStatistik', {
            url: '/statistik',
            templateUrl: 'modules/statistik/views/list-statistik.client.view.html'
        }).
        state('createStatistik', {
            url: '/statistik/create',
            templateUrl: 'modules/statistik/views/create-statistik.client.view.html'
        }).
        state('viewsamletStatistik', {
            url: '/statistik/:statId',
            templateUrl: 'modules/statistik/views/list-statistik.client.view.html'
        });

    }
]);