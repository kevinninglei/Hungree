app.controller('OneChefCtrl', function ($scope, chef, dishes, reviews, favorites) {
	$scope.chef = chef;
	$scope.dishes = dishes;
	$scope.reviews = reviews;
	$scope.favorites = favorites;
})

