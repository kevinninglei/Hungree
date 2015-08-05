app.controller('ModalPostCtrl', function($scope, $modalInstance, Reviews, $stateParams, user, dish) {
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.postReview = function() {
        var newReview = {
            description: $scope.description,
            rating: $scope.rate,
            user: user
        };
        dish.rating = (dish.rating * dish.reviews.length + $scope.rate) / (dish.reviews.length + 1);
        Reviews.postReview(newReview, $stateParams.id, dish, user) //posting review by updating dish
        .then(function() {
            $modalInstance.close();
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditCtrl', function($scope, $modalInstance, Reviews, $stateParams, review, dish) {
    $scope.oldRate = review.rating;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.editRate = review.rating;
    $scope.editDescription = review.description;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.editReview = function() {
        review.description = $scope.editDescription;
        review.rating = $scope.editRate;
        review.date = new Date();
        dish.rating = (dish.rating * dish.reviews.length - $scope.oldRate + $scope.editRate) / (dish.reviews.length);
        Reviews.editReview(review, dish)
            .then(function() {
                $modalInstance.close();
            }); //posting review by updating dish
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('ModalConfirmCtrl', function($scope, $modalInstance, Reviews, review) {

    $scope.archive = function() {
        review.archived = true;
        Reviews.archiveReview(review)
            .then(function() {
                $modalInstance.close();
            })
    }

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});