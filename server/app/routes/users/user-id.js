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
	Dish.find({
			_id: {
				$in: req.CurrentUser.dishes
			}
		}).exec()
		.then(function(dishes) {
			console.log('dishes!');
			res.json(dishes);
		})
		.then(null, next);
});

//gets the reviews that the user has written
router.get('/reviews', function(req, res, next) {

	User.populate(req.CurrentUser,{path:'reviews'},function(err,data){
		res.json(data.reviews);
	});
});

router.get('/orders', function(req, res, next) {
	User.populate(req.CurrentUser,{path:'orders'},function(err,data){
		res.json(data);
	});
	// Order.find({
	// 		_id: {
	// 			$in: req.CurrentUser.orders
	// 		}
	// 	}).exec()
	// 	.then(function(orders) {
	// 		res.json(orders);
	// 	})
	// 	.then(null, next);
});

router.get('/favorites', function(req, res, next) {
	Dish.find({
			_id: {
				$in: req.CurrentUser.favorites
			}
		}).exec()
		.then(function(favorites) {
			res.json(favorites);
		})
		.then(null, next);
});

router.get('/cart', function(req, res, next) {
	Order.findById(req.CurrentUser.cart).populate('dishes.dishId').exec()
		.then(function (order){
			res.json(order);
		})
		.then(null, next);
});

router.put('/cart', function (req, res, next){
	console.log('PUTTING NOW')
	var newDishObj = {
			dishId: req.body.dish,
			quantity: req.body.quantity
		}
	//--> if user has an existing cart(order), then push the dish + quantity and save
	// the user///and res.respond with dish
	//--> if the user doesn't have an existing cart(order), create a cart with the single dish
	// then save the user...and res.respond with dish
	if (!req.CurrentUser.cart){
		Order.create({
						user: req.CurrentUser._id,
						dishes:[newDishObj]
					})
			.then(function(order){
				//now that you have the order, you must save it to the current user
				req.CurrentUser.cart = order;
				return req.CurrentUser.save();
			})
			.then(function(user){
				res.json(user.cart);
			})
			.then(null, next);
	}else{
		Order.findById(req.CurrentUser.cart._id).exec()
			.then(function(order){

				order.dishes.push(newDishObj);
				return order.save();
			})
			.then(function(order){
				res.json(order);
			})
			.then(null, next);
	}
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