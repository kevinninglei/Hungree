app.directive('tagSearch', function (Tags, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        link: function(scope) {
            Tags.getTags()
            .then(function(tags) {
                scope.tags = tags;
            })

            scope.tagsToAdd = Tags.selectedTags;

            scope.addTag = function() {
                Tags.selectedTags.push(scope.selectedTag);
            }
            scope.removeTag = function(index) {
                Tags.selectedTags.splice(index, 1);
            }
        },
        templateUrl: 'js/common/directives/tag-search/tag-search.html'
    };

});