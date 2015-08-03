app.controller('ModalDemoCtrl', function ($scope, $modal, $log, Reviews) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'postReview.html',
      controller: 'ModalInstanceCtrl'
    });

    modalInstance.result.then(null, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.edit = function (review) {

    Reviews.reviewToEdit = review;

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'editReview.html',
      controller: 'ModalInstanceCtrl'
    });

    modalInstance.result.then(null, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, Reviews, $stateParams, AuthService, Chefs, $state) {

  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  // $scope.$watch(function() {

  // })

  if (Reviews.reviewToEdit) {
    $scope.editRate = Reviews.reviewToEdit.rating;
    $scope.editDescription = Reviews.reviewToEdit.description;
  }

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.editReview = function (user) {
    $modalInstance.close();
  	var updatedReview = {description: $scope.editDescription, rating: $scope.editRate, user: user, date: new Date()};
    Chefs.viewDish.rating = (Chefs.viewDish.rating*Chefs.viewDish.reviews.length - Reviews.reviewToEdit.rating + $scope.editRate) / (Chefs.viewDish.reviews.length);
    Reviews.editReview(Reviews.reviewToEdit._id, updatedReview, $stateParams.id, Chefs.viewDish)
    .then(function() {
      var index = Chefs.viewDish.reviews.indexOf(Reviews.reviewToEdit);
      Chefs.viewDish.reviews[index] = updatedReview;
    }); //posting review by updating dish
  };

  $scope.postReview = function () {
    $modalInstance.close();
    AuthService.getLoggedInUser()
    .then(function(user) {
    	var newReview = {description: $scope.description, rating: $scope.rate, user: user};
    	Chefs.viewDish.rating = (Chefs.viewDish.rating*Chefs.viewDish.reviews.length + $scope.rate) / (Chefs.viewDish.reviews.length + 1);
    	Reviews.postReview(newReview, $stateParams.id, Chefs.viewDish); //posting review by updating dish
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
