app.config(function ($stateProvider) {

    $stateProvider.state('oneDish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl',
        resolve: {
        	dish: function(Dish, $stateParams) {
        		return Dish.getOne($stateParams.id)
        	},
        	user: function(AuthService) {
        		return AuthService.getLoggedInUser();
        	}
        }
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, dish, $state, Stars, Chefs, user) {
	$scope.user = user;
	$scope.isCollapsed = true; //info collapse
	Chefs.viewDish = dish;
	$scope.dish = dish;
	$scope.ingredients = $scope.dish.ingredients.join(', ');
	$scope.tags = $scope.dish.tags.map(function(tag) {
		return tag.name;
	}).join(', ');

	$scope.getNumber = Stars.getNumber;
	$scope.getNumberInverse = Stars.getNumberInverse;
	$scope.addToOrder = function() {
		CartFactory.cartOrders.push($scope.dish);
		CartFactory.addToCart($scope.dish, 1);
		$state.go('listDishes');
	}
});
