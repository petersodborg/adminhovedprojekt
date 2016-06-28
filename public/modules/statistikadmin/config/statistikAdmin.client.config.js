/**
 * Created by petersodborgchristensen on 09/05/2016.
 */
'use strict';

// Configuring the Operator module
angular.module('statistikadmin').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Statistik', 'statistikadmin');//1 topbar. 2 tekst på menuen. 3 URLen den skal gå til.
        //Menus.addSubMenuItem('topbar', 'operators', 'List Operators', 'operators');
        //Menus.addSubMenuItem('topbar', 'operators', 'New Operator', 'operators/create');
    }
]);