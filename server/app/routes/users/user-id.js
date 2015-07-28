'use strict';
var mongoose = require('mongoose');
//var User = mongoose.model('User');
var Dish = mongoose.model('Dish');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var router = require('express').Router();

router.get('/', function (req, res, next) {
	res.json(req.user);
})

router.get('/dishes', function (req, res, next) {
	Dish.find({_id: {$in: req.user.dishes}}).exec()
		.then(function (dishes) {
			console.log('dishes!')
			res.json(dishes);
		})
		.then(null, next);
})

router.get('/reviews', function (req, res, next) {
	Review.find({_id: {$in: req.user.reviews}}).exec()
		.then(function (reviews) {
			res.json(reviews);
		})
		.then(null, next);
})

router.get('/orders', function (req, res, next) {
	Order.find({_id: {$in: req.user.orders}}).exec()
		.then(function (orders) {
			res.json(orders);
		})
		.then(null, next);
})

router.get('/favorites', function (req, res, next) {
	Dish.find({_id: {$in: req.user.favorites}}).exec()
		.then(function (favorites) {
			res.json(favorites);
		})
		.then(null, next);
})

module.exports = router;