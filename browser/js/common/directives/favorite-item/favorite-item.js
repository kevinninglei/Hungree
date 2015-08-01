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
      		$state.go('oneDish', {id: dish._id})
      	}
    }
  };
});