app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        templateUrl: 'js/list-dishes/list-dishes.html',
        controller: 'DishesCtrl',
        resolve: {
        	tags: function(Tags) {
        		return Tags.getTags()
        	}
        }
    });

});

app.controller('DishesCtrl', function($scope, Chefs, $state, $rootScope, Stars, Tags, tags) {
	if (!Chefs.nearbyDishes) {
		$scope.loading = true;
		$rootScope.$on('got-dishes', function(event, data) {
			$scope.loading = false;
			$scope.nearbyDishes = data;
		})
	}
	else $scope.nearbyDishes = Chefs.nearbyDishes
		
	$scope.categories = [
		{name: 'price'},
		{name: 'rating'},
		{name: 'spiciness'}
	];
	$scope.getNumber = Stars.getNumber;
	$scope.getNumberInverse = Stars.getNumberInverse;
	$scope.goToDish = function(dish) {
		$state.go('oneDish', {id: dish._id});
	}

	$scope.tags = tags;
    $scope.tagsToAdd = Tags.selectedTags;

    $scope.addTag = function(tag) {
    	if (Tags.selectedTags.indexOf(tag.name) === -1)
        	Tags.selectedTags.push(tag.name);
    }
    $scope.removeTag = function(index) {
        Tags.selectedTags.splice(index, 1);
    }
    $scope.search = function(dish) {
		if(!$scope.query) return true;
		if ((dish.name).toLowerCase().indexOf($scope.query.toLowerCase()) != -1) {
		  return true;
		} else {
		  return false;
		}
	};
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