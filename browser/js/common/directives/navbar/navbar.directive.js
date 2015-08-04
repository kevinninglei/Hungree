app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            scope.user = null;
            scope.isAdmin = function(){
                return scope.user.isAdmin;
            };

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.goToAccount = function(){
                $state.go('account',{id: scope.user._id});
            };

            scope.goToAdmin = function(){
                $state.go('admin');
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };



            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }


    };

});