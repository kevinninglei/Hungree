app.controller('ChefTabCtrl', function ($scope, $state) {
	$scope.currentTab = 'Dishes';

	//why cant i do this!?
	//$scope.dishes = dishes
  $scope.tabs = [{title: 'Dishes', route: 'oneChef.dishes'}, {title: 'Reviews', route: 'oneChef.reviews'}, {title: 'Favorites', route: 'oneChef.favorites'}];
  $scope.go = function(route){
      $state.go(route);
  };
  $scope.active = function(route){
      return $state.is(route);
  };
  $scope.$on("$stateChangeSuccess", function() {
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
    });
})