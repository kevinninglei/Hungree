app.factory('Chefs',function($http){
	console.log('here')
  return{
    getAll: function(){
      return $http.get('/api/users/')
        .then(function (res) {
                return res.data;
            });
    },
    getOne: function(id) {
    	console.log('getOne')
    	return $http.get('/api/users/' + id)
    		.then(function (res) {
    			return res.data;
    		})
    }
  };
});
