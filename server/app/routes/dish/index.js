'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');
var User = mongoose.model('User');
var https = require('https');

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

function convertAddress(user) {
	var street = user.shippingAddress.street;
	var city = user.shippingAddress.city;
	var state = user.shippingAddress.state
	var address = street+', '+city+', '+state;
	return address.replace(/ /g, '+');
}

router.get('/locations', function(req, res, next){
	User.findChefs()
		.then(function(chefs){
			var chefsArr = [];
			chefs.forEach(function(chef) {
				var chefObj = {chef: chef};
				var address = convertAddress(chef);
				var key = '&key=AIzaSyCSyc5QWQp2jw0q91SLI6hlDaWzAUIzy1o';
				https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+key, function(response) {
					var body = ""; //parse to json object 
					response.on('data', function(data){
						body += data;
					});
					response.on('end', function(){
						chefObj.lat = JSON.parse(body).results[0].geometry.location.lat;
						chefObj.lng = JSON.parse(body).results[0].geometry.location.lng;
						chefsArr.push(chefObj);
						if (chefsArr.length === chefs.length) {
							res.json(chefsArr)
						}
					});
				})
			})
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


