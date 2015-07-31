app.directive('dishItem', function() {
  return {
    restrict: 'E',
    scope: {
      dish: "=dish",
    },
    templateUrl: 'js/common/directives/dish-item/dish-item.html',
  };
});