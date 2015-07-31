app.config(function ($stateProvider) {

    $stateProvider.state('dish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl'
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams) {
	$scope.addToOrder = function() {
		CartFactory.cartOrders.push($stateParams.id);
		console.log(CartFactory.cartOrders);
	}
});