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
    },
    getReceivedOrders: function(id) {
      return $http.get(`/api/users/${id}/receivedorders`)
        .then(function(res) {

          //filter dishes that do not correspond with the chef
          res.data.forEach(function(order){
            order.dishes = order.dishes.filter(function(dish){
              return (String(dish.dishId.user) === id);
            })
          })
          return res.data;
        });
    },
    updateDishOrder: function (id, order, dish, status){
      var payload = {
        order: order,
        dish: dish,
        status: status
      }
      return $http.put(`/api/users/${id}/receivedorders/update`, payload)
        .then(function(order) {
          order.data.dishes = order.data.dishes.filter(function(dish){
              return (String(dish.dishId.user) === id);
          })
          return order.data;
        });
    }
  };
});