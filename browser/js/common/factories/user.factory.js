//User factory is used to get/create/update an arbitrary user
app.factory('UserFactory', function($http, $state) {
    var userApiPath = '/api/users';
    return {
        createUser: function(signupInfo) {
            return $http.post(userApiPath, signupInfo)
                .then(function(user) {
                    $state.go('listDishes');
                    return user.data;
                })
                .then(null, function(err) {
                    console.log(err.message);
                });
        },
        getUser: function(id) {
            return $http.get(userApiPath + '/' + id)
                .then(function(res) {
                    $state.go('listDishes');
                    return res.data;
                })
                .then(null, function(err) {
                    console.log(err.message);
                });
        },
        getOrders: function(id) {
            return $http.get(`/api/users/${id}/orders`)
                .then(function(res) {
                    return res.data;
                })
        },
        getAllUsers: function() {
            return $http.get(userApiPath)
                .then(function(res) {
                    return res.data;
                })
                .then(null, function(err) {
                    console.log(err.message);
                });
        },
        promote: function(id) {
            return $http.put(userApiPath + '/' + id, {
                    isAdmin: true
                })
                .then(function(promotedUser) {
                    return promotedUser.data;
                })
                .then(null, function(err) {
                    console.log(err.message)
                });
        },
        demote: function(id) {
            return $http.put(userApiPath + '/' + id, {
                    isAdmin: false
                })
                .then(function(promotedUser) {
                    return promotedUser.data;
                })
                .then(null, function(err) {
                    console.log(err.message)
                });
        },
        update: function(user) {
            return $http.put(userApiPath + '/' + user._id, user)
                .then(function(promotedUser) {
                    return promotedUser.data;
                })
                .then(null, function(err) {
                    console.log(err.message)
                });
        },
        delete: function(id) {
            return $http.delete(userApiPath + '/' + id)
                .then(function(promotedUser) {
                    return promotedUser.data;
                })
                .then(null, function(err) {
                    console.log(err.message)
                });
        }

    };
});
