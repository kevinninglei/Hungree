app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        AuthService.login(loginInfo).then(function () {
            $state.go('account');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});