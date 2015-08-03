app.controller('ListChefsCtrl', function($scope, chefs) {
  $scope.chefs = chefs;
  //custom filter
  $scope.search = function(chef) {
    if(!$scope.query) return true;
    if ((chef.name.first+' '+chef.name.last).toLowerCase().indexOf($scope.query.toLowerCase()) != -1) {
      return true;
    } else {
      return false;
    }
  };
});