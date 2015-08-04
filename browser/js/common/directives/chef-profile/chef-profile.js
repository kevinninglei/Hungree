app.directive('chefProfile', function(Stars) {

  return {
    restrict: 'E',
    scope: {
      chef: "=chef",
    },
    templateUrl: 'js/common/directives/chef-profile/chef-profile.html',
    link: function(scope, element, attribute) {
    	if (!scope.chef.dishes.length) scope.rating = 0;
    	else {
	    	scope.rating = scope.chef.dishes.reduce(function(a,b) {
	    		return {rating: a.rating+b.rating}
	    	}).rating / scope.chef.dishes.length;
	    }
    	scope.getNumber = Stars.getNumber;
    	scope.getNumberInverse = Stars.getNumberInverse;
    }
  };
});

