app.controller('ListChefsCtrl', function ($scope, chefs) {
  console.log(chefs);
  $scope.chefs = chefs;
});