app.controller('CartCtrl', function($scope, $http, CartFactory, $modal, $log) {
	$scope.total = 49;
	//1. given an existing 'order', populate the cart
	//2. ability to easy add dishes to the current order
	//3. keep the current order as a factory


	var selectedItems = {};
	$scope.updateSelectedCartItem = function() {
		console.log('deleting button showing...');
		$scope.showDeleteItemsButton = true;
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
				dishName: dish.dishId.name,
				dishDescription: dish.dishId.description,
				//price of a single dish
				dishPrice: dish.dishId.price,
				//used to configure the current <select>
				quantity: dish.quantity,
				isSelected: false
			});
		});
		$scope.cart = currCart;
		$scope.totalPrice = order.total;
		//console.log(currCart);
	};

	$scope.showDeleteItemsButton = false;

	$scope.deleteItems = function() {
		console.log($scope.cart);
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