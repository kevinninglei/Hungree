'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');


//  /api/dishes/
router.param('id', function(req, res, next, id) {
	Dish.findDish(id)
		.then(function(dish){
			if (!dish) {
				throw new Error();
			}
			else {
				req.dish = dish;
				req.id = id;
				next();
			}
		})
		.then(null, next);
});

router.get('/', function(req, res, next){
	Dish.findAllDishes()
		.then(function(dishes){
			res.json(dishes);
		})
		.then(null, next);

});

router.post('/', function(req, res, next) {
	Dish.create(req.body)
	.then(function(dish) {
		res.status(201).json(dish);
	})
	.then(null, next);
})

// /api/dishes/:id/
router.use('/:id', require('./dish-id.js'));


