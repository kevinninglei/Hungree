
app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites, Accounts, $stateParams, CartFactory) {
   $scope.user = chef;
   $scope.myDishes = dishes;
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
  $scope.addToOrder = function(dish) {
    CartFactory.cartOrders.push(dish);
    CartFactory.addToCart(dish, 1);
  };
});