app.directive('chefProfile', function () {
  console.log("hi");
    return {
        restrict: 'E',
        scope: {
          chef: "=chef"
        },
        templateUrl: 'js/common/directives/chef-profile/chef-profile.html'
        };
});