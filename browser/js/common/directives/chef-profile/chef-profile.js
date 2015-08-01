app.directive('chefProfile', function() {

  return {
    restrict: 'E',
    scope: {
      chef: "=chef",
    },
    templateUrl: 'js/common/directives/chef-profile/chef-profile.html',
    link: function(scope, element, attribute) {
    }
  };
});

