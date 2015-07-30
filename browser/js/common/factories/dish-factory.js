app.factory('Dishes', function ($http) {
    return {
        getDishes: function() {
            return $http.get('/api/dishes/locations')
            .then(function(res) {
                return res.data
            })
        }
    }
});
