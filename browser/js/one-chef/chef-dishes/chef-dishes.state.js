app.config(function ($stateProvider) {
	$stateProvider
	.state('chefDishes', {
		url: '/:id',
		//templateUrl: '/js/one-chef/chef-dishes/chef-dishes.html',
		template: '<p>omgggg</p>',
		controller: 'ChefDishesCtrl',
		resolve: {
			// dishes: function (Dish) {
			// 	console.log("IAMMMMM")
			// 	return Dish.getDishes();
			// }
		}
	})
})