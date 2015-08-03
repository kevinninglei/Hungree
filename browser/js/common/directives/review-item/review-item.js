app.directive('reviewItem', function() {
  return {
    restrict: 'E',
    scope: {
      review: "=",
      chef: "="
    },
    templateUrl: 'js/common/directives/review-item/review-item.html',
    link: function(scope, element, attribute, Stars) {
      console.log(scope.review);
      scope.getNumber = Stars.getNumber;
      scope.getNumberInverse = Stars.getNumberInverse;
    }
  };
});