app.directive('reviewItem', function() {
  return {
    restrict: 'E',
    scope: {
      review: "=",
      chef: "=",
    },
    templateUrl: 'js/common/directives/review-item/review-item.html'
  };
});