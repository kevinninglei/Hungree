app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites,CartFactory) {
   $scope.user = chef;
   $scope.myDishes = dishes;
   $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.favorites = favorites;

  $scope.addToOrder = function(dish) {
    CartFactory.cartOrders.push(dish);
    CartFactory.addToCart(dish, 1);
  };
});