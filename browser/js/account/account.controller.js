app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites, Accounts) {
   $scope.user = chef;
   $scope.dishes = dishes;
   $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.favorites = favorites;

   $scope.success;

   $scope.updateInfo = function() {
   		Accounts.updateInfo($scope.updatedUser)
   		.then(function() {
   			$scope.success = true;
   		})
   }
   $scope.updatePW = function() {
   		Accounts.updatePW($scope.updatedPW)
   }
});