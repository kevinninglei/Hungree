app.controller('OneChefCtrl', function ($scope, chef, dishes, reviews, favorites,orders) {
	$scope.chef = chef;
	$scope.dishes = dishes;
	$scope.reviews = reviews;
	$scope.favorites = favorites;
  	$scope.orders = orders;
  	console.log(reviews);
});

