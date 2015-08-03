app.config(function($stateProvider) {

  $stateProvider.state('account', {
    url: '/account/:id',
    templateUrl: 'js/account/account.html',
    controller: 'AccountCtrl',
    resolve: {
      chef: function (Chefs, $stateParams) {
        return Chefs.getOne($stateParams.id);
      },

      //not working dont know why
      // currentUser: function (UserFactory, $stateParams) {
      //   return UserFactory.getUser($stateParams.id);
      // }
    }
  });
});