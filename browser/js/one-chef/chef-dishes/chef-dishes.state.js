app.config(function ($stateProvider) {
	$stateProvider
	.state('chefDishes', {
		url: '/:id',
		//templateUrl: '/js/one-chef/chef-dishes/chef-dishes.html',
		template: '<p>YESSSS</p>'
		controller: 'ChefDishesCtrl',
	})
})