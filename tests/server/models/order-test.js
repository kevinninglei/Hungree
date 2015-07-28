var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);


var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var Dish = mongoose.model('Dish');

describe('Order Model', function() {

    beforeEach('Establish DB connection', function (done) {

        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, function(){
            var orderSeed = require('./order-test-seed');
            console.log(orderSeed(done));
        });
    });


    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    it('finds all of the Order', function (done){
    	// var order = new Order();
    	// order.save(function(err, order){
    	// 	console.log("ORDER IS", order);
    	// 	done()
    	// })
    Dish.find({}).exec()
    .then(function(dishes){
        console.log('dishes is: ', dishes)
        done();
    })


    })




});