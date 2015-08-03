app.controller('CartCtrl', function($scope, $http, CartFactory, $modal, $log) {
	$scope.total = 0;
	//1. given an existing 'order', populate the cart
	//2. ability to easy add dishes to the current order
	//3. keep the current order as a factory

	$scope.updateSelectedCartItem = function(ind) {
		$scope.showDeleteItemsButton = _.some($scope.cart, 'isSelected', true)

	};

	var populateCart = function(order){
		if (!order){
			$scope.cart = [];
			$scope.totalPrice = 0;
			return;
		}
		var currCart = [];
		var calculatedTotal = 0;
		order.dishes.forEach(function(dish) {
			currCart.push({
				dish: dish.dishId,
				quantity: dish.quantity,
				isSelected: false
			});
		});
		$scope.cart = currCart;
		$scope.totalPrice = order.total;
	};

	$scope.showDeleteItemsButton = false;

	$scope.deleteItems = function() {
		var deleteIds = _.pluck(_.filter($scope.cart, { 'isSelected': true }), 'dish._id');
		CartFactory.removeFromCart(deleteIds)
			.then(function(order){
				populateCart(order);
			});
	};

	CartFactory.getCurrentCart()
		.then(function(order) {
			populateCart(order);
		});

	$scope.open = function(price) {
		var modalInstance = $modal.open({
			animation: true,
			scope: $scope,
			templateUrl: 'js/cart/payment/payment.html',
			controller: 'paymentCtrl',
			resolve: {
				price: function() {
					return price;
				}
			}
		});



		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.toggleAnimation = function() {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};



});