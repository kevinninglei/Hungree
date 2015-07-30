app.factory('Chefs',function($http){


  return{
    getAll: function(){
      return $http.get('/api/user');
    }

  };
});
