'use strict'
app.config(function ($stateProvider) {
	$stateProvider.state('viewChef', {
		url: '/chefs/:id',
		templateUrl: '/js/view-chef/view-chef.html',
		controller: 'ViewChefCtrl',
		resolve: {
			chef: function (Chefs, $stateParams) {
				console.log('resolve')
				var x = Chefs.getOne($stateParams.id);
				console.log('after resolve', x);
				return x;
			}
		}
	})
})