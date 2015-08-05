app.controller('AdminCtrl', function($scope, $stateParams, dishes, orders, users, currentUser, UserFactory) {
  $scope.allDishes = dishes;
  //  $scope.myDishes = dishes;
  //  $scope.reviews = reviews;
  $scope.orders = orders;
  $scope.users = users;
  $scope.currentUser = currentUser;


  $scope.promote = function(id) {
    UserFactory.promote(id);
  };

  $scope.demote = function(id) {
    UserFactory.demote(id);
  };

  $scope.updateUser = function(user) {
    UserFactory.update(user);
  };

  $scope.deleteUser = function(id) {
    UserFactory.delete(id);
  };

});