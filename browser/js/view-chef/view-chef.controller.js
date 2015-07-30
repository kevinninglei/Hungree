app.controller('ViewChefCtrl', function ($scope, chef) {
	$scope.item = chef;
	$scope.item.extra = { name: 'Location', body: chef.location };
})

