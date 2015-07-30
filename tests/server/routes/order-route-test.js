'use strict'
var mongoose = require('mongoose');
require('../../../server/db/models');
var Dish = mongoose.model('Dish');
var Tag = mongoose.model('Tag');
var Order = mongoose.model('Order');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');


describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('Creating an Order', function () {
        var agent;
        var theUser;
        var theDish;
        beforeEach('Create Models', function (done){
            var userInfo = {
                name: "Kev",
                password: "ok",
                email: "hello@gmail.com"
            }

            var dishInfo = {
                name: "pizza",
                description: "pizzaa",
                price: 7,
                inventory: 100
            }

            var orderInfo = {
                dishes: [],
                userId: undefined
            }
            agent = supertest.agent(app);
            User.create(userInfo)
                .then(function (user){
                    theUser = user;
                    return Dish.create(dishInfo)
                })
                .then(function (dish){
                    theDish = dish;
                    orderInfo.userId = theUser._id;
                    var orderedDish = {
                        dishId: dish,
                        quantity: 10
                    }
                    orderInfo.dishes.push(orderedDish);
                    return Order.create(orderInfo)
                })
                .then(function (order){
                    done();
                }, done)
                .then(null, function(err){
                    done(err);
                })
        });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        describe('GET request for order', function () {
            it('gets all orders', function (done) {
                agent.get('/api/orders').expect(200).end(function (err, response) {
                    if (err) return done(err);
                    expect(response.body.length).to.equal(1);
                    done();
                })
            })
         });


        describe('POST request for order', function () {
            it('creates an order and adds it to the databse', function (done) {
                var test_order = new Order({ userId: theUser, dishes: [{dishId: theDish, quantity: 7}]})
                agent.post('/api/orders').send(test_order).expect(200).end(function (err, response){
                    if(err) return done(err);
                    expect(response.body.total).is.equal(49);
                    done();
                })
            })
        })
    })
})

