app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {
    $scope.sendLogin = function (loginInfo) {
        console.log(loginInfo);
        console.log(AuthService)
    };


    /*

	Sign In Button Actions

    */
    $scope.signInWithEmail = function () {
    	//validations checks for name + email + password,
    	//retrieve information and create user
        UserFactory.createUser($scope.info)
            .then(function(user){
                console.log(user);
            })


    }

    $scope.signInWithGoogle = function () {

    }

    $scope.signInWithFacebook = function () {
    	console.log($scope.info.firstname)

    }

});