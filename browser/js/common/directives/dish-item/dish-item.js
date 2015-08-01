app.directive('dishItem', function($state, Chefs) {
  return {
    restrict: 'E',
    scope: {
      dish: "=dish"
    },
    templateUrl: 'js/common/directives/dish-item/dish-item.html',
    link: function(scope, elem, attr) {
    	scope.goToDish = function(dish) {
    		Chefs.viewDish = dish;
      		$state.go('oneDish', {id: dish._id})
      	}
    }
  };
});