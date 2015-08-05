app.factory('Reviews', function($http) {

    return {
        getReviews: function(id) { //returns array of chef objects with dishes array
            return $http.get(`/api/users/${id}/reviews`)
                .then(function(res) {
                    return res.data;
                });
        },
        postReview: function(review, dishId, dish,user) { //put request because updating the dish
            return $http.post('/api/reviews', review)
                .then(function(review) {
                    dish.reviews.push(review.data._id);
                    user.reviews.push(review.data._id);
                    console.log(user);
                    return $http.put(`/api/dishes/${dishId}`, dish)
                })
                // .then(function(res){
                //     console.log("user2",user);
                //     return $http.put(`/api/users/${user._id}`,user);
                // })
                .then(function(user) {
                    return user.data;
                });
        },
        editReview: function(review, dish) {
            return $http.put(`/api/reviews/${review._id}`, review)
                .then(function(res) {
                    return $http.put(`/api/dishes/${dish._id}`, dish)
                })
                .then(function(res) {
                    return res.data;
                })
        },
        archiveReview: function(review) {
            return $http.put(`/api/reviews/${review._id}`, review)
                .then(function(res) {
                    return res.data;
                })
        }
    }
})