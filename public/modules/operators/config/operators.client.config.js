'use strict';

// Configuring the Operator module
angular.module('operators').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Operatører', 'operators');
		//Menus.addSubMenuItem('topbar', 'operators', 'List Operators', 'operators');
		//Menus.addSubMenuItem('topbar', 'operators', 'New Operator', 'operators/create');
	}
]);

