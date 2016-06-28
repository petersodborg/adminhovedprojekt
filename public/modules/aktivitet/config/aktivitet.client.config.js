/**
 * Created by petersodborgchristensen on 08/05/2016.
 */


'use strict';

// Configuring the Operator module
angular.module('aktiviteter').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Aktivitet', 'aktiviteter');
        //Menus.addSubMenuItem('topbar', 'operators', 'List Operators', 'operators');
        //Menus.addSubMenuItem('topbar', 'operators', 'New Operator', 'operators/create');
    }
]);