/**
 * Created by petersodborgchristensen on 27/04/2016.
 */

'use strict';

// Configuring the Operator module
angular.module('priser').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Pris Inds.', 'priser');
        //Menus.addSubMenuItem('topbar', 'operators', 'List Operators', 'operators');
        //Menus.addSubMenuItem('topbar', 'operators', 'New Operator', 'operators/create');
    }
]);