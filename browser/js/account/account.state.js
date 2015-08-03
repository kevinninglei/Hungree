app.config(function($stateProvider) {

  $stateProvider.state('account', {
      url: '/account/:id',
      templateUrl: 'js/account/account.html',
      controller: 'AccountCtrl',
      resolve: {
        chef: function(Chefs, $stateParams) {
          return Chefs.getOne($stateParams.id);
        },
        dishes: function(Dish, $stateParams) {
          return Dish.getDishesForChef($stateParams.id);
        },
        reviews: function(Reviews, $stateParams) {
          return Reviews.getReviews($stateParams.id);
        },
        orders: function(Orders, $stateParams) {
          return Orders.getDishesInOrders($stateParams.id);
        },
        favorites: function(Favorites, $stateParams) {
          return Favorites.getFavsForUser($stateParams.id);
        }

        //not working dont know why
        // currentUser: function (UserFactory, $stateParams) {
        //   return UserFactory.getUser($stateParams.id);
        // }
      }
    })
    .state('account.settings', {
      controller: 'AccountCtrl',
      url: '/settings',
      templateUrl: 'js/account/account.settings.html'
    })
    .state('account.overview', {
      controller: 'AccountCtrl',
      url: '/settings',
      templateUrl: 'js/account/account.overview.html'
    })
    .state('account.dishes', {
      controller: 'AccountCtrl',
      url: '/settings',
      templateUrl: 'js/account/account.dishes.html'
    })
    .state('account.favorites', {
      controller: 'AccountCtrl',
      url: '/settings',
      templateUrl: 'js/account/account.favorites.html'
    })
    .state('account.orders', {
      controller: 'AccountCtrl',
      url: '/settings',
      templateUrl: 'js/account/account.orders.html'
    });



});