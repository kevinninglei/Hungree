app.config(function ($stateProvider) {

    $stateProvider.state('dish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl'
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, Chefs, $state) {
	$scope.isCollapsed = true; //info collapse
	$scope.dish = Chefs.viewDish;
	$scope.ingredients = $scope.dish.ingredients.join(', ');
	$scope.tags = $scope.dish.tags.map(function(tag) {
		return tag.name;
	}).join(', ');

	$scope.getNumber = function(num) {
	    return new Array(Math.round(num));   
	}
	$scope.getNumberInverse = function(num) {
	    return new Array(5-Math.round(num));   
	}
	$scope.addToOrder = function() {
		CartFactory.cartOrders.push($scope.dish);
		CartFactory.addToCart($scope.dish, 1);
		$state.go('listDishes');
	}
	$scope.postReview = function() {
		$state.go('review', {id: $scope.dish._id})
	}
});

app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, Reviews, $stateParams, AuthService, Chefs) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    AuthService.getLoggedInUser()
    .then(function(user) {
    	var newReview = {description: $scope.description, rating: $scope.rate, user: user};
    	var updatedDish = _.omit(Chefs.viewDish, 'chef');
    	updatedDish.rating = (updatedDish.rating*updatedDish.reviews.length + $scope.rate) / (updatedDish.reviews.length + 1);
    	Chefs.viewDish.rating = updatedDish.rating;
    	Reviews.postReview(newReview, $stateParams.id, updatedDish); //posting review by updating dish
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
