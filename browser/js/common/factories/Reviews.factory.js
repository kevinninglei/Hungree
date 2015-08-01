app.factory('Reviews',function($http){

  return{
    getReviews: function(id) { //returns array of chef objects with dishes array
		return $http.get(`/api/users/${id}/reviews`)
		.then(function(res) {
		  return res.data;
		});
	},
    postReview: function(review, dishId, dish) { //put request because updating the dish
    	return $http.post('/api/reviews', review)
		.then(function(res) {
			dish.reviews.push(res.data);
			return $http.put(`/api/dishes/${dishId}`, dish)
		})
    	.then(function(res) {
    		return res.data;
		})
    }
  }
})