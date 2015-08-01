'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var _ = require('lodash');

// /api/reviews
router.post('/', function(req, res, next){
	Review.create(req.body)
	.then(function(review) {
		return Review.populate(review, {path:'user'})
	})
	.then(function(review){
		res.status(201).json(review);
	})
	.then(null, next);

});

router.put('/:id', function(req, res, next) {
	Review.findById(req.params.id).exec()
	.then(function(review) {
		_.extend(review, req.body);
		return review.save();
	})
	.then(function(review) {
		res.status(200).json(review);
	})
	.then(null, next);
});



