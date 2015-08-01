'use strict';
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');
var q = require('q');



var orderSchema = new mongoose.Schema({
	//make a static to fill if the user is a guest. add cookies to keep track of guest sessions
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	//array of dishes with quantities
	dishes: [{
		dishId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Dish'
		},
		quantity: Number
	}],
	//make static to calculate total for checkout
	total: {
		type: Number,
		default: 0
	},
	date: {
		type: Date,
		default:Date.now
	}

});


orderSchema.pre('save', function(next) {
	var order = this;
	//creates an array of promises for q to process
	var promiseArr = this.dishes.map(function(dishInOrder) {
		return Dish.findById(dishInOrder.dishId).exec();
	});

	//once array of promises are resolved, the results is an
	//array of dishes which must be computed.
	q.all(promiseArr).then(function(dishes) {
		var currTotal = 0;
		dishes.forEach(function(dish) {
			order.dishes.forEach(function(dishInOrder) {
				if (String(dishInOrder.dishId) === String(dish._id)) {
					currTotal += dishInOrder.quantity * dish.price;
				}
			});
		});
		order.total = currTotal;
		next();
	});
});

mongoose.model('Order', orderSchema);