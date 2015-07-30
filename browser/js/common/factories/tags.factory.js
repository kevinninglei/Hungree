app.factory('Tags',function($http){
  return{
    getTags: function() { //returns array of chef objects with dishes array
            return $http.get('/api/tags')
            .then(function(res) {
                return res.data;
            });
        }
  };
});
