app.directive('star', function(Stars) {

    return {
        restrict: 'E',
        scope:{
            num:"="
        },
        templateUrl: 'js/common/directives/star/star.html',
        link: function(scope,element,attribute) {

            scope.getNumber = function() {
                return Stars.getNumber(scope.num);
            };
            scope.getNumberInverse = function() {
                return Stars.getNumberInverse(scope.num);
            };
        }


    };

});