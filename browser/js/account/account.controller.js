
app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites, Accounts, $stateParams, CartFactory, $state) {
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
   		});
   };
   $scope.updatePW = function() {
   		if (!$scope.confirm) return alert("You haven't entered a new password!");
   		$scope.red = false;
   		$scope.green = false;
   		Accounts.updatePW($scope.updatedPW, $stateParams.id)
   		.then(function(res) {
   			if (res.status === 403) $scope.red = true;
   			else $scope.green = true;
   		});
   };

  $scope.addToOrder = function(dish) {
    CartFactory.cartOrders.push(dish);
    CartFactory.addToCart(dish, 1);
  };
  $scope.toggleComment = function(){
    $scope.toggled = !$scope.toggled;
  };
  $scope.goToDish = function(id) {
    Accounts.postingReview = true;
    $state.go('oneDish', {id: id})
  }
});