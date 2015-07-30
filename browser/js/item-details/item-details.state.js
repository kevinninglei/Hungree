'use strict'
app.config(function ($stateProvider) {
	$stateProvider
	.state('itemDetails', {
		url: '/chefs/:id',
		templateUrl: '/js/item-details/item-details.html',
		controller: 'ItemDetailsCtrl',
		resolve: {
			chef: function (Chefs, $stateParams) {
				return Chefs.getOne($stateParams.id);
			}
		}
	})
	.state('viewChef.chefDishes', {
		url:'/dishes',
		tempalteUrl:'<p>Heyyyyy</p>',

	})
})