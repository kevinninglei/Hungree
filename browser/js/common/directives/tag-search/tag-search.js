app.directive('tagSearch', function (Tags, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        link: function(scope) {
            Tags.getTags()
            .then(function(tags) {
                scope.tags = tags;
            })

            scope.tagsToAdd = [];

            scope.addTag = function() {
                scope.tagsToAdd.push(scope.selectedTag);
            }
        },
        templateUrl: 'js/common/directives/tag-search/tag-search.html'
    };

});