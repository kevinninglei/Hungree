app.controller('AccountCtrl', function($scope,chef,dishes,reviews,orders,favorites) {
   $scope.user = chef;
   $scope.dishes = dishes;
   $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.favorites = favorites;

});