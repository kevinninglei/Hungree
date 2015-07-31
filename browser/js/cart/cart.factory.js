app.factory('CartFactory', function($http, OrderFactory, AuthService){
	return {
		getCurrentCart: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
            		return $http.get('/api/users/' + user._id + '/cart')
        		})
        		.then(function(cart){
        			return cart.data;
        		})
		},
		cartOrders: []
	}

})