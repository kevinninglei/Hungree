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

router.get('/reviews', function(req, res, next) {
	Review.find({
			_id: {
				$in: req.CurrentUser.reviews
			}
		}).exec()
		.then(function(reviews) {
			res.json(reviews);
		})
		.then(null, next);
});

router.get('/orders', function(req, res, next) {
	Order.find({
			_id: {
				$in: req.CurrentUser.orders
			}
		}).exec()
		.then(function(orders) {
			res.json(orders);
		})
		.then(null, next);
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