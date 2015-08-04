app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {
    $scope.sendLogin = function (loginInfo) {
    };


    $scope.signInWithEmail = function () {
    	//validations checks for name + email + password,
    	//retrieve information and create user
        UserFactory.createUser($scope.info)
            .then(function(user){
                return AuthService.login($scope.info)
            }).then(function () {
                return AuthService.getLoggedInUser();
            })
            .then(function(user){
                $state.go('account',{id: user._id});
            }).catch(function () {
                console.log('error occured')
            });
    }

});