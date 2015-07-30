app.directive('itemInfo', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/item-info/item-info.html',
        link: function (scope, element) {
            scope.item = Chefs.getOne(element._id);
        }
    };

});