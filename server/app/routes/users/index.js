'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();

router.get('/', function(req, res, next){
	User.find({}).exec()
		.then(function(users) {
			console.log('success!')
			res.json(users);
		})
		.then(null, function(err){
			console.log(err)
		});
})

module.exports = router;