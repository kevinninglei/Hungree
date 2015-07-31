'use strict'
app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/:id/dishes')
	$stateProvider
	.state('oneChef', {
		url: '/chefs/:id',
		templateUrl: '/js/one-chef/one-chef.html',
		controller: 'OneChefCtrl',
		resolve: {
			chef: function (Chefs, $stateParams) {
				return Chefs.getOne($stateParams.id);
			},
			dishes: function (Dish) {
				return Dish.getDishes();
			},
			reviews: function(Reviews, $stateParams) {
				return Reviews.getReviews($stateParams.id)
			},
			favorites: function(Favorites, $stateParams) {
				return Favorites.getFavsForUser($stateParams.id)
			}
		}
	})
	.state('oneChef.dishes', {
		controller: 'ChefTabCtrl',
		url: '/dishes',
		templateUrl: '/js/one-chef/chef-tab-dishes.html'
	})
	.state('oneChef.reviews', {
		url: '/reviews',
		templateUrl: '/js/one-chef/chef-tab-reviews.html'
	})
	.state('oneChef.favorites', {
		url: '/favorites',
		templateUrl: '/js/one-chef/chef-tab-favorites.html'
	})
})