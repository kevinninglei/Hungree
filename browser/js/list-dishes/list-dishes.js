app.config(function ($stateProvider) {

    $stateProvider.state('listDishes', {
        url: '/dishes',
        template: `<div ng-repeat="chef in nearbyChefs">
	        		<h3>{{chef.name.first}} {{chef.name.last}}</h3>
	        		<ul>
	        			<li ng-repeat="dish in chef.dishes">{{dish.name}}</li>
	        		</ul>
        		</div>`,
        controller: 'DishesCtrl'
    });

});

app.controller('DishesCtrl', function($scope, Chefs) {
	$scope.nearbyChefs = Chefs.nearbyChefs 
});