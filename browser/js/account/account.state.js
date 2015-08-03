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
  });
});