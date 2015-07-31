app.factory('Reviews',function($http){

  return{
    getReviews: function(id) { //returns array of chef objects with dishes array
      return $http.get(`/api/users/${id}/reviews`)
      .then(function(res) {
          return res.data;
      });
    }
  }
})