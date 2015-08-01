app.config(function ($stateProvider) {

    $stateProvider.state('review', {
        url: '/dishes/:id/review',
        templateUrl: 'js/dish/review/review.html',
        controller: 'ReviewCtrl'
    });

});

app.controller('ReviewCtrl', function($scope, CartFactory, $stateParams, Chefs) {

});