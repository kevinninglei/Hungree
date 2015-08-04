'use strict';
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var router = require('express').Router();
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
	Order.find({}).populate('dishes.dishId user').exec()
		.then(function(orders){
			return User.populate(orders,{path:'dishes.dishId.user'});
			})
		.then(function(popOrders) {
			res.json(popOrders)
		})
		.then(null, next);
});

router.post('/', function(req, res, next) {
	Order.create(req.body)
		.then(function(order) {
			res.json(order);
		})
		.then(null, next);
});

module.exports = router;