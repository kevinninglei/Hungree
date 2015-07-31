app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	chefs: function(Chefs) { //array of chefs obj (with dishes)
        		return Chefs.getChefs();
        	}
        }
    });
});

app.controller('HomeCtrl', function($scope, chefs, $http, Chefs) {

	$scope.getLocation = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition($scope.getChefsCloseBy);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	Number.prototype.toRadians = function() {
		return this*Math.PI/180;
	}

	$scope.getChefsCloseBy = function(position) {
		Chefs.position = position;
		Chefs.nearbyDishes = chefs.filter(function(chef) {
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
	};

	if (!Chefs.position) $scope.getLocation();
});