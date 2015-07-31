'use strict'
app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/:id/dishes')
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
	.state('oneChef.dishes', {
		url: '/dishes',
		templateUrl: 'js/one-chef/chef-dishes/chef-dishes.html',
	})
	.state('oneChef.reviews', {
		url: '/reviews',
		templateUrl: 'js/one-chef/chef-dishes/chef-dishes.html',
	})
	// .state('chefDishes', {
	// 	url: '/:id',
	// 	//templateUrl: '/js/one-chef/chef-dishes/chef-dishes.html',
	// 	template: '<p>omgggg</p>',
	// 	controller: 'ChefDishesCtrl',
	// 	resolve: {
	// 		dishes: function (Dish, $stateParams) {
	// 			console.log("IAMMMMM")
	// 			return Dish.getDishes();
	// 		}
	// 	}
	// })
})