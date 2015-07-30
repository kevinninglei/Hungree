'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();



router.get('/', function(req, res, next){
	User.find({}).populate('dishes').exec()
		.then(function(users) {
			res.json(users);
		})
		.then(null,next);
});

router.post('/', function (req, res, next) {
	User.create(req.body)
		.then(function(user){
			res.status(201).json(user);
		})
		.then(null, next);
});

router.param('id', function (req, res, next) {
	User.findById(req.params.id).exec()
		.then(function (user) {
			if (user) {
				req.user = user;
				next();
			} else {
				throw new Error();
			}
		})
		.then(null, next);
});

router.use('/:id', require('./user-id'));





module.exports = router;