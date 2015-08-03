app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        AuthService.login(loginInfo).then(function () {
          return  AuthService.getLoggedInUser();
        }).then(function(user){
          $state.go('account',{id: user._id});
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});