app.factory('Orders', function($http) {

  return {
    getOrders: function(id) { //returns array of chef objects with dishes array
      return $http.get(`/api/users/${id}/orders`)
        .then(function(res) {
          return res.data;
        });
    },
    getDishesInOrders: function(id) {
      return this.getOrders(id)
        .then(function(orders) {
          return orders.map(function(order) {
            return order.dishes;

          });
        })
    }
  };
});