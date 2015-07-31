app.factory('Dish',function($http){

  return{
    getDishes: function() { //returns array of chef objects with dishes array
            return $http.get('/api/dishes')
            .then(function(res) {
                return res.data;
            });
        }
      }
    })