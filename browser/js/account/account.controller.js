app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites,CartFactory) {
   $scope.user = chef;
   $scope.myDishes = dishes;
   $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.favorites = favorites;
   $scope.limit = 100;
   $scope.toggled = true;
//Need to add in directive
  $scope.addToOrder = function(dish) {
    CartFactory.cartOrders.push(dish);
    CartFactory.addToCart(dish, 1);
  };
  $scope.toggleComment = function(){
    $scope.toggled = !$scope.toggled;
  };
});