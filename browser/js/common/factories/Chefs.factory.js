app.factory('Chefs',function($http){
  return{
    getChefs: function() { //returns array of chef objects with dishes array
            return $http.get('/api/users/chefs')
            .then(function(res) {
                return res.data;
            });
        },
    getOne: function(id) {
    	return $http.get('/api/users/' + id)
    		.then(function (res) {
    			return res.data;
    		})
    }
  }; // nearbyDishes attached here from home.state.js, viewDish from list.dishes.js
});
