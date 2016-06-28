/**
 * Created by petersodborgchristensen on 09/05/2016.
 */
/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

// Setting up route
angular.module('statistikadmin').config(['$stateProvider',
    function($stateProvider) {
        // Annonce state routing
        $stateProvider.
        state('viewsamletStatistikAdmin', {
            url: '/statistikadmin',
            templateUrl: 'modules/statistikadmin/views/view-statadmin.client.view.html'
        });

    }
]);