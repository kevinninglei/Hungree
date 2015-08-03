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
					return $http.put('/api/users/' + user._id + '/cart/add', dishReqLoad);
        		})
        		.then(function(cart){
        			return cart.data;
        		})
        		.then(null, function(err){
        			$state.go('home');
        		})
		},
		removeFromCart: function(dishesToRemove){
			return AuthService.getLoggedInUser()
				.then(function(user){
					if (!user) throw new Error('Not Logged In');
					return $http.put('/api/users/' + user._id + '/cart/remove', {dishesToRemove: dishesToRemove});
        		})
        		.then(function(cart){
        			return cart.data;
        		})
        		.then(null, function(err){
        			$state.go('home');
        		})

		},

		//dishesToUpdate is a object with key: dish_id val: new quantity
		updateDishQuantity: function(dishesToUpdate){
			return AuthService.getLoggedInUser()
				.then(function(user){
					if (!user) throw new Error('Not Logged In');
					return $http.put('/api/users/' + user._id + '/cart/update', {dishesToUpdate: dishesToUpdate});
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