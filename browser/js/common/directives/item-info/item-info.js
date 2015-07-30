app.directive('itemInfo', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/item-info/item-info.html',
        link: function (scope, element, attr) {
        	console.log("attr",attr);
        	console.log("elem",element);
        	var factory;
        	if(attr.class === 'chef') {
        		factory = 'Chef';
        	} else if (attr.class === 'dish'){
        		factory = 'Dish';
        	}
        	console.log(factory)
          scope.item = factory.getOne(element._id);
        }
    };

});