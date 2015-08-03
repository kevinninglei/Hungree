app.config(function ($stateProvider) {

    $stateProvider.state('oneDish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl',
        resolve: {
        	dish: function(Dish, $stateParams) {
        		return Dish.getOne($stateParams.id)
        	}
        }
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, dish, $state, Stars, Chefs) {
	$scope.isCollapsed = true; //info collapse
	Chefs.viewDish = dish;
	$scope.dish = dish;
	$scope.ingredients = $scope.dish.ingredients.join(', ');
	$scope.tags = $scope.dish.tags.map(function(tag) {
		return tag.name;
	}).join(', ');

	$scope.getNumber = Stars.getNumber;
	$scope.getNumberInverse = Stars.getNumberInverse;
	$scope.addToOrder = function() {
		CartFactory.cartOrders.push($scope.dish);
		CartFactory.addToCart($scope.dish, 1);
		$state.go('listDishes');
	}
});

app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(null, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, Reviews, $stateParams, AuthService, Chefs) {

  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ok = function () {
    $modalInstance.close();
    AuthService.getLoggedInUser()
    .then(function(user) {
    	var newReview = {description: $scope.description, rating: $scope.rate, user: user};
    	// var updatedDish = _.omit(Chefs.viewDish, 'chef');
    	Chefs.viewDish.rating = (Chefs.viewDish.rating*Chefs.viewDish.reviews.length + $scope.rate) / (Chefs.viewDish.reviews.length + 1);
    	// Chefs.viewDish.rating = updatedDish.rating;
    	Reviews.postReview(newReview, $stateParams.id, Chefs.viewDish); //posting review by updating dish
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
