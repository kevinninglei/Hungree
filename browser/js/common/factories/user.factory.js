//User factory is used to get/create/update an arbitrary user
app.factory('UserFactory', function ($http) {
	var userApiPath = '/api/users';
	return {
		createUser: function (signupInfo) {
			return $http.post(userApiPath, signupInfo)
				.then(function(user){
					return user.data;
				})
        .then(null,next);
		},
    getUser: function(id){
      return $http.get(userApiPath+'/'+id)
      .then(function(res){
        return res.data;
      })
      .then(null,next);
    }
	};
});