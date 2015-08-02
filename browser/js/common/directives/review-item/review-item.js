app.directive('reviewItem', function() {
  return {
    restrict: 'E',
    scope: {
      review: "=",
      user: "=",
      orders: "="
    },
    templateUrl: 'js/common/directives/review-item/review-item.html'
  };
});