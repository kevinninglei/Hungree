app.controller('AdminCtrl', function($scope, $stateParams, dishes, orders, users, currentUser, UserFactory) {
  $scope.allDishes = dishes;
  //  $scope.myDishes = dishes;
  //  $scope.reviews = reviews;
  $scope.orders = orders;
  $scope.users = users;
  $scope.currentUser = currentUser;
  // $scope.$state= $state;



  $scope.promote = function(id) {
    UserFactory.promote(id).then(function(){
      return UserFactory.getAllUsers();
    })
    .then(function(users){
      $scope.users =users;
    });
  };

  $scope.demote = function(id) {
    UserFactory.demote(id).then(function(){
      return UserFactory.getAllUsers();
    })
    .then(function(users){
      $scope.users =users;
    });
  };

  $scope.updateUser = function(user) {
    UserFactory.update(user).then(function(){
      return UserFactory.getAllUsers();
    })
    .then(function(users){
      $scope.users =users;
    });
  };

  $scope.deleteUser = function(id) {
    UserFactory.delete(id).then(function(){
      return UserFactory.getAllUsers();
    })
    .then(function(users){
      $scope.users =users;
    });
  };

});