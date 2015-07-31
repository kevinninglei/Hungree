app.config(function ($stateProvider) {

    $stateProvider.state('dish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl'
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, Chefs, $state) {
	$scope.dish = Chefs.viewDish;
	console.log($scope.dish)
	$scope.addToOrder = function() {
		CartFactory.cartOrders.push($scope.dish);
		CartFactory.addToCart($scope.dish, 1)
		$state.go('listDishes');
	}
});