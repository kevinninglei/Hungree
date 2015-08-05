app.config(function($stateProvider) {

    $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'js/admin/admin.html',
            controller: 'AdminCtrl',
            resolve: {
                // chef: function(Chefs, $stateParams) {
                //   return Chefs.getOne($stateParams.id);
                // },
                dishes: function(Dish, $stateParams) {
                    return Dish.getAll();
                },
                // reviews: function(Reviews, $stateParams) {
                //   return Reviews.getReviews($stateParams.id);
                // },
                orders: function(OrderFactory, $stateParams) {
                    return OrderFactory.getAllOrders();
                },
                // favorites: function(Favorites, $stateParams) {
                //   return Favorites.getFavsForUser($stateParams.id);
                // },
                users: function(UserFactory) {
                    return UserFactory.getAllUsers();
                },
                currentUser: function(AuthService) {
                    return AuthService.getLoggedInUser();
                }
            }
        })
        .state('admin.dishes', {
            // controller: 'AdminCtrl',
            url: '/dishes',
            templateUrl: 'js/admin/admin.dishes.html'
        })
        .state('admin.orders', {
            // controller: 'AdminCtrl',
            url: '/orders',
            templateUrl: 'js/admin/admin.orders.html'
        })
        .state('admin.users', {
            // controller: 'AdminCtrl',
            url: '/users',
            templateUrl: 'js/Admin/admin.users.html'
        });
});
