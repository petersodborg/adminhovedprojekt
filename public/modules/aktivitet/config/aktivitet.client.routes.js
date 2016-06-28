/**
 * Created by petersodborgchristensen on 08/05/2016.
 */
'use strict';

//Setting up route
angular.module('aktiviteter').config(['$stateProvider',
    function($stateProvider) {
        // Aktiviteter state routing
        $stateProvider.
        state('listaktiviteter', {
            url: '/aktiviteter',
            templateUrl: 'modules/aktivitet/views/list-aktiviteter.client.view.html'
        }).
        state('createaktiviteter', {
            url: '/aktiviteter/create',
            templateUrl: 'modules/aktivitet/views/create-aktivitet.client.view.html'
        }).
        state('viewaktiviteter', {
            url: '/aktiviteter/:aktivitetId',
            templateUrl: 'modules/aktivitet/views/list-aktiviteter.client.view.html'
        }).
        state('editAktivitet', {
            url: '/aktiviteter/:aktivitetId/edit',
            templateUrl: 'modules/aktivitet/views/edit-aktivitet.client.view.html'
        });
    }
]);
