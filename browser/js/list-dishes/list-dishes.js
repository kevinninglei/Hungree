app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        templateUrl: 'js/list-dishes/list-dishes.html',
        controller: 'DishesCtrl'
    });

});

app.controller('DishesCtrl', function($scope, Chefs, $state, $rootScope) {
	if (!Chefs.nearbyDishes) {
		$rootScope.$on('got-dishes', function(event, data) {
			$scope.nearbyDishes = Chefs.nearbyDishes;
		})
	}
	else $scope.nearbyDishes = Chefs.nearbyDishes
		
	$scope.categories = [
		{name: 'price'},
		{name: 'rating'},
		{name: 'spiciness'}
	];

	$scope.goToDish = function(dish) {
		Chefs.viewDish = dish;
		$state.go('dish', {id: dish._id});
	}
});

app.filter('tags', function(Tags) {
	return function(dishes) {
		if (!Tags.selectedTags.length) return dishes;
		return dishes.filter(function(dish) {
			var filtered = dish.tags.filter(function(tag) {
				return Tags.selectedTags.indexOf(tag.name) !== -1;
			})
			return !!filtered.length;
		})
	}
})


//dish.tag = ids, Tags.selectedTags = full tags