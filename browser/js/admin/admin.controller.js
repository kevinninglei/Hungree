
app.controller('AdminCtrl', function($scope,$stateParams,dishes,orders,users,currentUser){
   $scope.allDishes = dishes;
  //  $scope.myDishes = dishes;
  //  $scope.reviews = reviews;
   $scope.orders = orders;
   $scope.users =users;
   $scope.currentUser = currentUser;
  //  $scope.favorites = favorites;
  //  $scope.adminToggle = false;

  //  $scope.isAdmin = $scope.user.isAdmin;

  //  $scope.success = false;

  //  $scope.updateInfo = function() {
  //     Accounts.updateInfo($scope.user)
  //     .then(function() {
  //       $scope.success = true;
  //     });
  //  };
  //  $scope.updatePW = function() {
  //     $scope.red = false;
  //     $scope.green = false;
  //     Accounts.updatePW($scope.updatedPW, $stateParams.id)
  //     .then(function(res) {
  //       if (res.status === 403) $scope.red = true;
  //       else $scope.green = true;
  //     });
  //  };

  // $scope.addToOrder = function(dish) {
  //   CartFactory.cartOrders.push(dish);
  //   CartFactory.addToCart(dish, 1);
  // };
  // $scope.toggleComment = function(){
  //   $scope.toggled = !$scope.toggled;
  });