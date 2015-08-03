app.directive('reviewItem', function(Stars) {
  return {
    restrict: 'E',
    scope: {
      review: "=",
      chef: "="
    },
    templateUrl: 'js/common/directives/chef-review/review-item.html',
    link: function(scope, element, attribute) {
      scope.getNumber = Stars.getNumber;
      scope.getNumberInverse = Stars.getNumberInverse;
    }
  };
});