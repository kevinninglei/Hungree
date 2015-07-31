app.controller('paymentCtrl', function($scope, $modalInstance, price) {
  $scope.price = price;

  $scope.setFormScope = function(scope) {
    this.$form = $("#form-payment");

    console.log(this.$form);
  };

  $scope.stripeResponseHandler = function(status, response) {
    console.log(status, response);
    if (response.error) {
      $scope.error = response.error.message;
      // Show the errors on the form
      // $form.find('.payment-errors').text(response.error.message);
      // $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $scope.form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $scope.form.get(0).submit();
    }

  };

  $scope.ok = function() {
    Stripe.setPublishableKey('pk_test_ZJ2EdpJbGoQokkcIwkci5gOY');
    Stripe.card.createToken(
      // $scope.$form
    {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '08',
        exp_year: '2016'
      }
      , $scope.stripeResponseHandler);
    return false;
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});