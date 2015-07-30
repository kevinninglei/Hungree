app.controller('OneChefCtrl', function ($scope, chef) {
	$scope.chef = chef;
	$scope.currentTab = 'Dishes';
  $scope.tabs = [{title: 'Dishes', state: 'chefDishes'}, {title: 'Reviews', state: 'chefReviews'}, {title: 'Favorites', state: 'chefFavorites'}];

	$scope.isActiveTab = function(tab) {
		return tab.title === $scope.currentTab;
	}
})

