app.directive('favoriteItem', function($state, Chefs) {
  return {
    restrict: 'E',
    scope: {
      favorite: "=favorite",
    },
    templateUrl: 'js/common/directives/favorite-item/favorite-item.html',
    link: function(scope, elem, attr) {
      scope.goToDish = function(dish) {
        Chefs.viewDish = dish;
        $state.go('oneDish', {
          id: dish._id
        })
      };

      scope.getNumber = function(num) {
        return new Array(Math.round(num))
      };
      scope.getNumberInverse = function(num) {
        return new Array(5 - Math.round(num));
      };
    }
  };
});