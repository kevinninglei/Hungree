'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Dish = mongoose.model('Dish');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var router = require('express').Router();
var _ = require('lodash');

router.get('/', function(req, res) {
	res.json(req.CurrentUser);
});

router.get('/dishes', function(req, res, next) {
	Dish.populate(req.CurrentUser, {
			path: 'dishes'
		})
		.then(function(data) {
			res.json(data.dishes);
		})
		.then(null, next);
});

//gets the reviews that the user has written
router.get('/reviews', function(req, res, next) {
	User.populate(req.CurrentUser, {
			path: 'reviews'
		})
		.then(function(data) {
			return Dish.populate(data.reviews,{path:'dish'})
		})
		.then(function(result){
			res.json(result);
		})
		.then(null, next);

});

router.get('/orders', function(req, res, next) {
	Order.populate(req.CurrentUser, {
			path: 'orders'
		})
		.then(function(user) {
			return user.orders;
		})
		.then(function(orders) {
			return Dish.populate(orders, {
				path: 'dishes.dishId'
			});
		})
		.then(function(popOrder) {
			return Review.populate(popOrder, {
				path: 'dishes.dishId.reviews'
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.then(null, next);
});

router.get('/favorites', function(req, res, next) {
	Dish.populate(req.CurrentUser, {
			path: 'favorites'
		})
		.then(function(data) {
			res.json(data.favorites);
		})
		.then(null, next);
});

router.get('/cart', function(req, res, next) {
	Order.findById(req.CurrentUser.cart).populate('dishes.dishId').exec()
		.then(function(order) {
			res.json(order);
		})
		.then(null, next);
});

router.put('/cart/add', function(req, res, next) {
	var newDishObj = {
			dishId: req.body.dish,
			quantity: req.body.quantity
		}
		//--> if user has an existing cart(order), then push the dish + quantity and save
		// the user///and res.respond with dish
		//--> if the user doesn't have an existing cart(order), create a cart with the single dish
		// then save the user...and res.respond with dish
	if (!req.CurrentUser.cart) {
		Order.create({
				user: req.CurrentUser._id,
				dishes: [newDishObj]
			})
			.then(function(order) {
				//now that you have the order, you must save it to the current user
				req.CurrentUser.cart = order;
				return req.CurrentUser.save();
			})
			.then(function(user) {
				res.json(user.cart);
			})
			.then(null, next);
	} else {
		Order.findById(req.CurrentUser.cart._id).exec()
			.then(function(order) {

				order.dishes.push(newDishObj);
				return order.save();
			})
			.then(function(order) {
				res.json(order);
			})
			.then(null, next);
	}
});

//to remove dishes from an order you want to:
// 1. retrieve the order
// 2. remove the orders that are passed in
router.put('/cart/remove', function(req, res, next){
	var removeDishIds = req.body.dishesToRemove;
	Order.findById(req.CurrentUser.cart._id).exec()
		.then(function(order) {

			var dishesToSave = [];
			order.dishes.forEach(function(dish, index){
				if (!(removeDishIds.indexOf(String(dish.dishId)) >= 0)){
					dishesToSave.push(dish);
				}
			});

			order.dishes = dishesToSave;
			return order.save();
		})
		.then(function(order) {
			order.populate('dishes.dishId', function(err, newOrder){
				res.json(newOrder);
			})
		})
		
		.then(null, next);

});


router.put('/', function(req, res, next) {
	_.extend(req.CurrentUser, req.body);
	req.CurrentUser.save()
		// User.findByIdAndUpdate(req.CurrentUser._id, req.body, { new: true }).exec()
		.then(function(user) {
			res.status(200).json(user);
		})
		.then(null, next);
});



router.delete('/', function(req, res, next) {
	//NEed to loop through
	//	- Reviews
	//	- Dishes
	//  - Orders
	// and delete if user._id is found
	// /!\ We are keeping the reviews and orders associated with the deleted Dish
	// So that customers can refer back to them
	// We'll add a "dish was deleted by Chef" message
	req.CurrentUser.remove()
		.then(function() {
			res.status(200).json({
				message: 'Successfully deleted!'
			})
		})
		.then(null, next);
});

module.exports = router;