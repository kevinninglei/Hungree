app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        templateUrl: 'js/list-dishes/list-dishes.html',
        controller: 'DishesCtrl'
    });

});

app.controller('DishesCtrl', function($scope, Chefs) {
	$scope.nearbyChefs = Chefs.nearbyChefs 
});