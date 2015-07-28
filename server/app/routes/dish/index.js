'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');


//  /api/dish/
router.get('/', function(req, res, next){
	Dish.find({}).exec()
		.then(function(dishes){
			res.json(dishes);
		})
		.then(null, next);

});

//  /api/dish/:id/
router.get('/:id', function(req, res, next){
	Dish.find(req.params).exec()
		.then(function(dish){
			res.json(dish);
		})
		.then(null, next);
});

//  /api/dish/:id/reviews
router.get('/:id/reviews', function(req, res, next){
	Dish.getReviews(req.params)
		.then(function(reviews){
			res.json(reviews)
		})
		.then(null, next);
});

