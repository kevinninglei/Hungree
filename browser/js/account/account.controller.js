app.controller('AccountCtrl', function($scope, chef, dishes, reviews, orders, favorites, receivedOrders, Accounts, $stateParams, CartFactory, currentUser, Orders $state, Dish, Tags) {
    $scope.user = currentUser;
    $scope.myDishes = dishes;
    $scope.reviews = reviews;
    $scope.orders = orders;
    $scope.favorites = favorites;

    $scope.receivedOrders = receivedOrders;
    $scope.adminToggle = false;
    $scope.isAdmin = $scope.user.isAdmin;
    $scope.success = false;

    $scope.updateInfo = function() {
        Accounts.updateInfo($scope.user)
            .then(function() {
                $scope.success = true;
            });
    };
    $scope.updatePW = function() {
        $scope.red = false;
        $scope.green = false;
        Accounts.updatePW($scope.updatedPW, $stateParams.id)
            .then(function(res) {
                if (res.status === 403) $scope.red = true;
                else $scope.green = true;
            });
    };

    $scope.addToOrder = function(dish) {
        CartFactory.addToCart(dish, 1);
    };


    $scope.updateDishOrder = function(order, dish, orderIndex, status) {
        Orders.updateDishOrder(currentUser._id, order, dish, status)
            .then(function(updatedOrder) {
                $scope.receivedOrders[orderIndex] = updatedOrder;
            })
    }

    $scope.toggleComment = function() {
        $scope.toggled = !$scope.toggled;
    };

    $scope.goToDish = function(id) {
        Accounts.postingReview = true;
        $state.go('oneDish', {
            id: id
        })
    }
    $scope.addDish = function() {
        $scope.newDish.ingredients = $scope.newDish.ingredients.split(', ');
        $scope.newDish.spiciness = parseInt($scope.newDish.spiciness);
        $scope.newDish.user = $scope.user;
        Tags.postTags($scope.newDish.tags.split(', '))
            .then(function(tags) {
                $scope.newDish.tags = tags.map(function(tag) {
                    return tag._id;
                });
                return Dish.postOne($scope.newDish)
            })
            .then(function(dish) {
                $scope.user.dishes.push(dish);
                return Accounts.updateInfo($scope.user)
            })
            .then(function(user) {
                $state.go('account.dishes');
                console.log(user)
            })
    }
});