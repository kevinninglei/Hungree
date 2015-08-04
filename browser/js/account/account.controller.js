app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites, receivedOrders, Accounts, $stateParams, CartFactory,currentUser, Orders) {
   $scope.user = currentUser;
   $scope.myDishes = dishes;
   $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.favorites = favorites;

   $scope.receivedOrders = receivedOrders;
   $scope.adminToggle = false;
   $scope.isAdmin = $scope.user.isAdmin;
   $scope.success = false;

   $scope.updateInfo = function() {
   		Accounts.updateInfo($scope.user)
   		.then(function() {
   			$scope.success = true;
   		});
   };
   $scope.updatePW = function() {
   		$scope.red = false;
   		$scope.green = false;
   		Accounts.updatePW($scope.updatedPW, $stateParams.id)
   		.then(function(res) {
   			if (res.status === 403) $scope.red = true;
   			else $scope.green = true;
   		});
   };

  $scope.addToOrder = function(dish) {
    CartFactory.addToCart(dish, 1);
  };


  $scope.updateDishOrder = function(order, dish, orderIndex, status){
    Orders.updateDishOrder(chef._id, order, dish, status)
      .then(function(updatedOrder){
        $scope.receivedOrders[orderIndex] = updatedOrder;
      })
  }

  $scope.toggleComment = function(){
    $scope.toggled = !$scope.toggled;
  };
});