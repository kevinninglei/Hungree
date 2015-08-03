app.factory('Accounts',function($http){
  return{
    updateInfo: function(user) { //returns array of chef objects with dishes array
            return $http.put(`/api/users/${user._id}`, user)
            .then(function(res) {
                return res.data;
            });
        },
    updatePW: function(pw, id) {
    	return $http.put(`/api/users/${id}/password`, pw)
    		.then(function (res) {
    			return res.data;
    		});
    }
  }; // nearbyDishes attached here from home.state.js, viewDish from list.dishes.js
});
