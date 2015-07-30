'use strict'
app.config(function ($stateProvider) {
	$stateProvider.state('viewChef', {
		url: 'chefs/:id',
		tempalteUrl: 'js/view-chef/view-chef.html',
		controller: 'ViewChefCtrl',
		resolve: {
			chef: function (Chefs, $stateParams) {
				return Chefs.getOne($stateParams.id);
			}
		}
	})
})