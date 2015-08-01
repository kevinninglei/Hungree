app.factory('CartFactory', function($http, OrderFactory, AuthService, $state){
	return {
		getCurrentCart: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
					if (!user) throw new Error('Not Logged In, Cannot Access Cart');
            		return $http.get('/api/users/' + user._id + '/cart')
        		})
        		.then(function(cart){
        			return cart.data;
        		})
        		.then(null, function(err){
        			$state.go('home');
        		})
		},

		addToCart: function (d, q) {
			var dishReqLoad = {
				dish: d._id,
				quantity: q
			}
			return AuthService.getLoggedInUser()
				.then(function(user){
					if (!user) throw new Error('Not Logged In');
					return $http.put('/api/users/' + user._id + '/cart', dishReqLoad);
        		})
        		.then(function(cart){
        			return cart.data;
        		})
        		.then(null, function(err){
        			$state.go('home');
        		})
		},

		cartOrders: []
	}

})