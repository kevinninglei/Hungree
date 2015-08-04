app.config(function ($stateProvider) {

    $stateProvider.state('oneDish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl',
        resolve: {
        	dish: function(Dish, $stateParams) {
        		return Dish.getOne($stateParams.id)
        	},
        	user: function(AuthService, UserFactory) {
        		var obj = {};
        		return AuthService.getLoggedInUser()
        		.then(function(user) {
        			obj.user = user;
        			return UserFactory.getOrders(user._id)
        		})
        		.then(function(orders) {
        			obj.orders = orders;
        			return obj;
        		})
        	}
        }
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, dish, $state, Stars, Chefs, user) {
	$scope.user = user.user;
	$scope.dish = dish;
	user.orders.forEach(function(order) {
		order.dishes.forEach(function(dish) {
			if (dish.dishId._id === $scope.dish._id) $scope.ordered = true;
		})
	})
	$scope.isCollapsed = true; //info collapse
	Chefs.viewDish = dish;
	$scope.ingredients = $scope.dish.ingredients.join(', ');
	$scope.tags = $scope.dish.tags.map(function(tag) {
		return tag.name;
	}).join(', ');
	

	$scope.getNumber = Stars.getNumber;
	$scope.getNumberInverse = Stars.getNumberInverse;

	//TODO: allow for various quantities
	
	$scope.addToOrder = function() {
		CartFactory.addToCart($scope.dish, 1);
		$state.go('listDishes');
	}
});
