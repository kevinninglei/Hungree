app.controller('ItemDetailsCtrl', function ($scope, chef) {
	$scope.item = chef;
	$scope.item.extra = { name: 'Location', body: chef.location };
	
	$scope.tabs = [{title: 'Dishes', state: 'chefDishes'}, {title: 'Reviews', state: 'chefReviews'}, {title: 'Favorites', state: 'chefFavorites'}];
	$scope.currentTab = 'Dishes';
	$scope.isActiveTab = function(tab) {
		console.log(tab.title, tab.title === $scope.currentTab)
		return tab.title === $scope.currentTab;
	}
})

