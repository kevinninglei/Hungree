app.directive('reviewItem', function() {
  return {
    restrict: 'E',
    scope: {
      review: "=",
      chef: "=",
    },
    templateUrl: 'js/common/directives/review-item/review-item.html',
    link: function(scope, elemant, attribute, Stars) {
      scope.getNumber = function(num) {
        return new Array(Math.round(num))
      };
      scope.getNumberInverse = function(num) {
        return new Array(5-Math.round(num));
      };

    }
  };
});