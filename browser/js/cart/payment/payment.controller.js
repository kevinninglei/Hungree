app.controller('paymentCtrl', function($scope, $modalInstance, price, $state, CartFactory, populateCart,user) {
  $scope.price = price;

  $scope.setFormScope = function(scope) {
    this.$form = $("#payment-form");
  };

  $scope.closeAlert=function(){
    $scope.error = null;
    $scope.$digest();
  };

  $scope.stripeResponseHandler = function(status, response) {
    if (response.error) {
      $scope.error = response.error.message;
      $scope.$digest();
      // Show the errors on the form
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
        // Insert the token into the form so it gets submitted to the server
      $scope.$form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      console.log($scope.$form);
      $modalInstance.close();
      CartFactory.confirmOrder()
        .then(function(order){
          //injected from parent controller
          populateCart(order);
          //Not working to reidrect to account, why?
          $state.go('account.purchases',{id: user._id});
        });

    }

  };

  $scope.ok = function(card) {
    if(!card) return false;
    Stripe.setPublishableKey('pk_test_ZJ2EdpJbGoQokkcIwkci5gOY');
    Stripe.card.createToken(
      $scope.$form, $scope.stripeResponseHandler);
    return false;
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});