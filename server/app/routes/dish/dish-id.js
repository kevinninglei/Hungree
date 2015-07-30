'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');

//  /api/dishes/:id/
router.get('/', function(req, res){
	res.json(req.dish);
});

router.get('/reviews', function(req, res){
	res.json(req.dish.reviews);
});

router.put('/', function(req, res, next) {
	//why doesn't this work? and i also have the dish already attached to
	//req.dish from my router.param. Why doesn't it have a save/remove method?

	// Dish.findDish(req.dish._id)
	// .then(function(dish) {
	// 	for (var key in req.body) {
	// 		dish[key] = req.body[key];
	// 	}
	// 	return dish.save();
	// 	// res.status(200).json(dish);
	// })
	// .then(function(dish) {
	// 	console.log('updated dish', dish)
	// 	res.status(200).json(dish);
	// })
	// .then(null, next)

	Dish.findByIdAndUpdate(req.dish._id, req.body, { new: true }).exec()
	.then(function (dish) {
		res.status(200).json(dish);
	})
	.then(null, next);
})

router.delete('/', function(req, res, next) {
	Dish.findByIdAndRemove(req.dish._id).exec()
	.then(function () {
		res.status(200).json({message: 'Successfully deleted!'})
	})
	.then(null, next)
})