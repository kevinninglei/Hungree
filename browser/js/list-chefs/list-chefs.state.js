app.config(function ($stateProvider,Chefs) {

    $stateProvider.state('listChefs', {
        url: '/chefs',
        templateUrl: 'js/list-chefs/list-chefs.html',
        controller: 'SignupCtrl',
        resolve: {
          user: Chefs.getAll()
        }
    });
});
