'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');

var orderSchema = new mongoose.Schema({
	//make a static to fill if the user is a guest. add cookies to keep track of guest sessions
	userId: {type: mongoose.Schema.ObjectId, ref: 'User'},
	//array of dishes with quantities 
	dishes: [{
		dishId: {type: mongoose.Schema.ObjectId, ref: 'Dish'},
		quantity: Number
	}],
	//make static to calculate total for checkout
	total: { type: Number, default: 0}

})

orderSchema.pre('save', function (next, done) {

	Dish.find({}).exec()
	.then(function(dishes){
		console.log('dishes is: ', dishes)
		done();
	})
	// //mary need to try ['price']
	// Dish.find({}).populate('dishes.dishId', 'price').exec()
	// .then(function (price) {
	// 	this.total += price * this.dishes.quantity;
	// })
	// .then(null, function (err){
	// 	throw err.message
	// })
})

mongoose.model('Order', orderSchema);