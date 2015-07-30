app.controller('CartCtrl', function ($scope, $http){
	$scope.total = 49;
	$http.get('/api/orders')
		.then(function(orders){
			console.log('orders is:', orders)
		})




	
})