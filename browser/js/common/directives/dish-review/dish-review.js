app.directive('dishReview', function(Stars) {
  return {
    restrict: 'E',
    scope: {
      user: "=",
      review: "="
    },
    templateUrl: 'js/common/directives/dish-review/dish-review.html',
    link: function(scope, element, attribute) {
      scope.getNumber = Stars.getNumber;
      scope.getNumberInverse = Stars.getNumberInverse;
    }
  };
});