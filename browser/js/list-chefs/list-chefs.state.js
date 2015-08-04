app.config(function ($stateProvider) {

    $stateProvider.state('listChefs', {
        url: '/chefs',
        templateUrl: 'js/list-chefs/list-chefs.html',
        controller: 'ListChefsCtrl',
        resolve: {
          chefs: function(Chefs){
            return Chefs.getChefs();
          }
        }
    });
});
