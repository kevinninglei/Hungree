app.controller('ChefTabCtrl', function ($scope) {
	$scope.currentTab = 'Dishes';
  $scope.tabs = [{title: 'Dishes', content: 'chefDishes'}, {title: 'Reviews', content: 'chefReviews'}, {title: 'Favorites', content: 'chefFavorites'}];

	// $scope.isActiveTab = function(tab) {
	// 	return tab.title === $scope.currentTab;
	// }
})