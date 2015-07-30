app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        template: '<p>test</p>',
        controller: 'DishesCtrl',
        resolve: {
        	dishes: function(Dishes) { //chefs obj (with dishes), lat and lng {chef:chef, lat:lat, lng:lng}
        		return Dishes.getDishes()
        	}
        }
    });

});

app.controller('DishesCtrl', function($scope, dishes, $http) {
	console.log(dishes);
	$scope.dishes = dishes;

	$scope.getDishesCloseBy = function() {
		var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2-lon1).toRadians(), R = 6371000; // gives d in metres
		var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
	}
})