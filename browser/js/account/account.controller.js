app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites, Accounts, $stateParams) {
   $scope.user = chef;
   $scope.dishes = dishes;
   $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.favorites = favorites;

   $scope.success = false;

   $scope.updateInfo = function() {
   		Accounts.updateInfo($scope.user)
   		.then(function() {
   			$scope.success = true;
   		})
   }
   $scope.updatePW = function() {
   		$scope.red = false;
   		$scope.green = false;
   		Accounts.updatePW($scope.updatedPW, $stateParams.id)
   		.then(function(res) {
   			if (res.status === 403) $scope.red = true;
   			else $scope.green = true;
   		})
   }
});