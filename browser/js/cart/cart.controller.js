app.controller('CartCtrl', function ($scope, $http, OrderFactory){
	$scope.total = 49;



	OrderFactory.getAllOrders()
		.then(function(orders){
			console.log(orders);


		})





	
})