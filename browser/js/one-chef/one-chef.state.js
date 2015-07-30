'use strict'
app.config(function ($stateProvider) {
	console.log('here')
	$stateProvider
	.state('oneChef', {
		url: '/:id',
		templateUrl: '/js/one-chef/one-chef.html',
		controller: 'OneChefCtrl',
		resolve: {
			chef: function (Chefs, $stateParams) {
				return Chefs.getOne($stateParams.id);
			}
		}
	})
})