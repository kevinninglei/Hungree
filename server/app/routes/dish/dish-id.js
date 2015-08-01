'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');
var _ = require('lodash');

//  /api/dishes/:id/
router.get('/', function(req, res){
	res.json(req.dish);
});

router.get('/reviews', function(req, res){
	res.json(req.dish.reviews);
});

router.put('/', function(req, res, next) {
	console.log(req.dish, req.body)
	_.extend(req.dish, req.body);
	req.dish.save()
	.then(function (dish) {
		res.status(200).json(dish);
	})
	.then(null, next);
});

router.delete('/', function(req, res, next) {
	req.dish.remove()
	// Dish.findByIdAndRemove(req.dish._id).exec()
	.then(function () {
		res.status(200).json({message: 'Successfully deleted!'});
	})
	.then(null, next);
})