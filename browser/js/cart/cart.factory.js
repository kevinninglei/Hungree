app.factory('CartFactory', function($http, OrderFactory){
	return {


		//cart factory will be a representation
		//of a single order, for now, we will arbitrarily have a single
		//order be a what is inside of the cart
		//this will be later replaced by sessions but
		//should still have the same format as a single order
		getCurrentCart: function(){
			return OrderFactory.getAllOrders().then(function(data){
				return data[0];
			})
		},
		cartOrders: []
	}

})