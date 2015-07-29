// Instantiate all models
var mongoose = require('mongoose');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');

//run models
require('../../../server/db/models');
var Dish = mongoose.model('Dish');
var Tag = mongoose.model('Tag');
var Order = mongoose.model('Order');
var User = mongoose.model('User');


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

        var theUser;
        beforeEach('Create Models', function (done){
            User.create(userInfo)
                .then(function (user){
                    theUser = user;
                    return Dish.create(dishInfo)
                })
                .then(function (dish){
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
                })
                .then(null, function(err){
                    done(err);
                })
        });


        describe('get order from database', function (){

            it('gets all orders', function (done){
                Order.find({}).exec()
                    .then(function(orders){
                        console.log(orders)
                        expect(orders.length).to.equal(1);
                        done();
                    })
                    .then(null, function(err){
                        done(err)
                    })

            })
        })



    })


})