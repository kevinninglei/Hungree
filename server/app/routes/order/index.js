'use strict';
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var router = require('express').Router();

router.get('/', function(req, res, next) {
	Order.find({}).populate('dishes.dishId').exec()
		.then(function(orders) {
			res.json(orders)
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