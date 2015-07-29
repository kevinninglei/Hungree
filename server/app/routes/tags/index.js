'use strict';
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');
var Dish = mongoose.model('Dish');
var router = require('express').Router();
var _ = require('lodash');

router.get('/', function (req, res, next) {
	Tag.find({}).exec()
		.then(function(tags) {
			res.json(tags)
		})
		.then(null, next);
})

//find all dishes with that tagname
router.get('/:tagname', function (req, res, next) {
	Dish.find({}).populate('tags').exec()
		.then(function (dishes) {
			var filtered = dishes.filter(function (dish) {
				var tags = dish.tags;
				return _.some(tags, {name: req.params.tagname});
			});
			res.json(filtered);
		})
		.then(null, next);
})

module.exports = router;