app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        template: `<p>test</p>
        		<ul>
        			<li ng-repeat="dish in nearbyDishes">{{dish}}</li>
        		</ul>`,
        controller: 'DishesCtrl'
    });

});

app.controller('DishesCtrl', function($scope, Dishes) {
	$scope.nearbyDishes = Dishes.nearbyDishes;
});