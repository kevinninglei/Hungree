app.directive('favoriteItem', function() {
  return {
    restrict: 'E',
    scope: {
      favorite: "=favorite",
    },
    templateUrl: 'js/common/directives/favorite-item/favorite-item.html'
  };
});