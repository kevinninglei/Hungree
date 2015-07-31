app.controller('paymentCtrl', function ($scope, $modalInstance) {

  $scope.price = price;
  console.log($scope.price);
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});