app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        templateUrl: 'js/list-dishes/list-dishes.html',
        controller: 'DishesCtrl'
    });

});

app.controller('DishesCtrl', function($scope, Chefs) {
	$scope.nearbyChefs = Chefs.nearbyChefs;
	$scope.filters = {};
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