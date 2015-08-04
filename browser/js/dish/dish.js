app.config(function($stateProvider) {

    $stateProvider.state('oneDish', {
        url: '/dishes/:id',
        templateUrl: 'js/dish/dish.html',
        controller: 'DishCtrl',
        resolve: {
            dish: function(Dish, $stateParams) {
                return Dish.getOne($stateParams.id)
            },
            user: function(AuthService, UserFactory) {
                var obj = {};
                return AuthService.getLoggedInUser()
                    .then(function(user) {
                        obj.user = user;
                        return UserFactory.getOrders(user._id)
                    })
                    .then(function(orders) {
                        obj.orders = orders;
                        return obj;
                    })
            }
        }
    });

});

app.controller('DishCtrl', function($scope, CartFactory, $stateParams, dish, $state, Stars, user, $modal, $log, Reviews, Accounts) {
    $scope.user = user.user;
    $scope.dish = dish;
    user.orders.forEach(function(order) {
        order.dishes.forEach(function(dish) {
            if (dish.dishId._id === $scope.dish._id) $scope.ordered = true;
        })
    })
    $scope.isCollapsed = true; //info collapse
    $scope.ingredients = $scope.dish.ingredients.join(', ');
    $scope.tags = $scope.dish.tags.map(function(tag) {
        return tag.name;
    }).join(', ');


    $scope.getNumber = Stars.getNumber;
    $scope.getNumberInverse = Stars.getNumberInverse;

    //TODO: allow for various quantities

    $scope.addToOrder = function() {
        CartFactory.addToCart($scope.dish, 1);
        $state.go('listDishes');
    }

    $scope.open = function() {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'postReview.html',
            controller: 'ModalPostCtrl',
            resolve: {
                dish: function() {
                    return $scope.dish;
                },
                user: function() {
                    return $scope.user;
                }
            }
        });

        modalInstance.result.then(null, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    if (Accounts.postingReview) {
        $scope.open();
        Accounts.postingReview = false;
    }

    $scope.edit = function(review) {
        // Reviews.reviewToEdit = review;

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'editReview.html',
            controller: 'ModalEditCtrl',
            resolve: {
                review: function() {
                    return review;
                },
                dish: function() {
                    return $scope.dish
                }
            }
        });

        modalInstance.result.then(null, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.confirm = function(review) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'confirm.html',
            controller: 'ModalConfirmCtrl',
            resolve: {
                review: function() {
                    return review;
                }
            }
        });

        modalInstance.result.then(null, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
});