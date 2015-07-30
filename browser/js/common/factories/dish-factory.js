app.factory('Chefs', function ($http) {
    return {
        getChefs: function() { //returns array of chef objects with dishes array
            return $http.get('/api/users/chefs')
            .then(function(res) {
                return res.data;
            });
        }
    };
});
