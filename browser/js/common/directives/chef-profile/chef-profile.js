app.directive('chefProfile', function() {
  console.log("hi");
  return {
    restrict: 'E',
    scope: {
      chef: "=chef",
    },
    templateUrl: 'js/common/directives/chef-profile/chef-profile.html',
    link: function(scope, element, attribute) {
      // console.log("status",scope.status);
      // console.log("scope",scope);
      // console.log("element",element);
      // console.log("attribute",attribute);
    }
  };
});