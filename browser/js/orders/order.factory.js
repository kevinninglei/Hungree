app.factory('OrderFactory', function($http){
	var orderApiPath = '/api/orders'

	return {
		//returns a promise for all orders
		getAllOrders: function(){
			return $http.get(orderApiPath)
				.then(function(orders){
					return orders.data;
				})

		}
	}

})