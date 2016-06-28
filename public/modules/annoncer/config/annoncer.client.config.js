/**
 * Created by petersodborgchristensen on 25/04/2016.
 */
'use strict';

// Configuring the Operator module
angular.module('annoncer').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Annoncer', 'annoncer');
        //Menus.addSubMenuItem('topbar', 'operators', 'List Operators', 'operators');
        //Menus.addSubMenuItem('topbar', 'operators', 'New Operator', 'operators/create');
    }
]);