'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');
var User = mongoose.model('User');

//  /api/dishes/
router.param('id', function(req, res, next, id) {
	Dish.findDish(id)
		.then(function(dish){
			if (!dish) {
				throw new Error("Dish doesn't exist!");
			}
			else {
				req.dish = dish;
				next();
			}
		})
		.then(null, next);
});

router.get('/', function(req, res, next){
	Dish.findAllDishes()
		.then(function(dishes){
			return User.populate(dishes,{path: 'user'});
		})
		.then(function(popDishes){
			res.json(popDishes);
		})
		.then(null, next);

});

router.post('/', function(req, res, next) {
	Dish.create(req.body)
	.then(function(dish) {
		res.status(201).json(dish);
	})
	.then(null, next);
});

// /api/dishes/:id/
router.use('/:id', require('./dish-id.js'));


