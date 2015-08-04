app.config(function($stateProvider) {

  $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: 'js/admin/admin.html',
      controller: 'AdminCtrl',
      resolve: {
        // chef: function(Chefs, $stateParams) {
        //   return Chefs.getOne($stateParams.id);
        // },
        // dishes: function(Dish, $stateParams) {
        //   return Dish.getDishesForChef($stateParams.id);
        // },
        // reviews: function(Reviews, $stateParams) {
        //   return Reviews.getReviews($stateParams.id);
        // },
        // orders: function(Orders, $stateParams) {
        //   return Orders.getOrders($stateParams.id);
        // },
        // favorites: function(Favorites, $stateParams) {
        //   return Favorites.getFavsForUser($stateParams.id);
        // },
        // currentUser: function(AuthService) {
        //   return AuthService.getLoggedInUser();
        // }
      }
    })
    .state('admin.products', {
      controller: 'AccountCtrl',
      url: '/products',
      templateUrl: 'js/admin/admin.products.html'
    })
    .state('admin.orders', {
      controller: 'AdminCtrl',
      url: '/orders',
      templateUrl: 'js/admin/admin.orders.html'
    })
    .state('admin.users', {
      controller: 'AdminCtrl',
      url: '/users',
      templateUrl: 'js/Admin/admin.users.html'
    });
});