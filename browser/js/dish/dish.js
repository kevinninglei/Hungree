app.config(function ($stateProvider) {

    $stateProvider.state('dish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl'
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, Chefs, $state) {
	$scope.dish = Chefs.viewDish;
	$scope.ingredients = $scope.dish.ingredients.join(', ');
	$scope.tags = $scope.dish.tags.map(function(tag) {
		return tag.name;
	}).join(', ');

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}
	$scope.addToOrder = function() {
		CartFactory.cartOrders.push($scope.dish);
	}
	$scope.postReview = function() {
		$state.go('review', {id: $scope.dish._id})
	}
});