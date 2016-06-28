/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

// Setting up route
angular.module('brugere').config(['$stateProvider',
    function($stateProvider) {
        // User state routing
        $stateProvider.
        state('listBrugere', {
            url: '/brugere',
            templateUrl: 'modules/brugere/views/list-users.client.view.html'
        }).
        state('createBruger', {
            url: '/brugere/signup',
            templateUrl: 'modules/brugere/views/create-user.client.view.html'
        }).
        state('editBruger', {
            url: '/brugere/:userId/edit',
            templateUrl: 'modules/brugere/views/edit-user.client.view.html'
        });

    }
]);