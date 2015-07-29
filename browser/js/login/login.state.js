app.config(function ($stateProvider) {

    $stateProvider.state('logIn', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});
