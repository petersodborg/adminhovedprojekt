/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

// Setting up route
angular.module('annoncer').config(['$stateProvider',
    function($stateProvider) {
        // Annonce state routing
        $stateProvider.
        state('listAnnoncer', {
            url: '/annoncer',
            templateUrl: 'modules/annoncer/views/list-annoncer.client.view.html'
        }).
        state('createAnnonce', {
            url: '/annoncer/create',
            templateUrl: 'modules/annoncer/views/create-annonce.client.view.html'
        }).
        state('viewAnnonce', {
            url: '/annoncer/:annonceId',
            templateUrl: 'modules/annoncer/views/list-annoncer.client.view.html'
        }).
        state('editAnnonce', {
            url: '/annoncer/:annonceId/edit',
            templateUrl: 'modules/annoncer/views/edit-annonce.client.view.html'
        });
    }
]);