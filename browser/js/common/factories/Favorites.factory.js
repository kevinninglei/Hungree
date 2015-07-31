app.factory('Favorites',function($http){
  return{
    getFavsForUser: function(id) { //returns array of chef objects with dishes array
      return $http.get(`/api/users/${id}/favorites`)
      .then(function(res) {
          return res.data;
      });
    }
  }
})