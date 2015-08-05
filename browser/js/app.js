'use strict';
window.app = angular.module('HungreeApp', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

});

app.run(function(Chefs, $rootScope) {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getChefsCloseBy);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    Number.prototype.toRadians = function() {
        return this*Math.PI/180;
    }

    function getChefsCloseBy(position) {
        Chefs.position = position;
        // Chefs.nearbyDishes =
        Chefs.getChefs().then(function(chefs) {
            return chefs.filter(function(chef) {
                var φ1 = chef.address.lat.toRadians(),
                    φ2 = position.coords.latitude.toRadians(),
                    Δλ = (position.coords.longitude-chef.address.lng).toRadians(),
                    R = 6371000; // gives d in metres
                var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
                // console.log(chef);
                return d <= 1609340; //0.5 mile = 804.672m
            })
            .reduce(function(returningArray, chef) {
                // push an new array of the recipe with reference to the chef
                chef.dishes.forEach(function(dish) { //attach reference to chef on each dish
                    dish.chef = chef;
                })
                return returningArray.concat(chef.dishes) //concat all dishes
            }, [])
        })
        .then(function(dishes) {
            Chefs.nearbyDishes = dishes;
            $rootScope.$broadcast('got-dishes', dishes);
        })
    };

    getLocation();
})