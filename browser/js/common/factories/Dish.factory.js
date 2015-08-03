app.factory('Dish',function($http){

  return{
    getDishesForChef: function(id) { //returns array of chef objects with dishes array
      return $http.get(`/api/users/${id}/dishes`)
      .then(function(res) {
          return res.data;
      });
    }
  };
});