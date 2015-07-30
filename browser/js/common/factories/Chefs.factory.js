app.factory('Chefs',function($http){
  return{
    getAll: function(){
      return $http.get('/api/users/')
        .then(function(res) {
                return res.data;
            });
    }
  };
});
