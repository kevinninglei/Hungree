'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();
var https = require('https');

router.get('/', function(req, res, next){
	User.find({}).populate('dishes').exec()
		.then(function(users) {
			res.json(users);
		})
		.then(null,next);
});

function convertAddress(user) {
	var street = user.address.shipping.street;
	var city = user.address.shipping.city;
	var state = user.address.shipping.state
	var address = street+', '+city+', '+state;
	return address.replace(/ /g, '+');
}

router.get('/chefs', function(req, res, next){
	User.findChefs()
		.then(function(chefs){
			res.json(chefs);
			// var chefsArr = [];
			// chefs.forEach(function(chef) {
			// 	var chefObj = {chef: chef};
			// 	var address = convertAddress(chef);
			// 	var key = '&key=AIzaSyCSyc5QWQp2jw0q91SLI6hlDaWzAUIzy1o';
			// 	https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+key, function(response) {
			// 		var body = ""; //parse to json object
			// 	    response.on('data', function(data){
			// 	      body += data;
			// 	    });
			// 	    response.on('end', function(){
			// 	    	chefObj.lat = JSON.parse(body).results[0].geometry.location.lat;
			// 	    	chefObj.lng = JSON.parse(body).results[0].geometry.location.lng;
			// 	    	chefsArr.push(chefObj);
			// 	    	if (chefsArr.length === chefs.length) {
			// 	    		res.json(chefsArr)
			// 	    	}
			// 	    });
			// 	})
			// })
		})
		.then(null, next);

});

router.post('/', function (req, res, next) {
	User.create(req.body)
		.then(function(user){
			res.status(201).json(user);
		})
		.then(null, next);
});

router.param('id', function (req, res, next) {
	User.findById(req.params.id).populate('cart').exec()
		.then(function (user) {
			if (user) {
				req.CurrentUser = user;
				next();
			} else {
				throw new Error("User doesn't exist!");
			}
		})
		.then(null, next);
});

router.use('/:id', require('./user-id'));

module.exports = router;