var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Dish = mongoose.model('Dish');

var models = {
    User: mongoose.model('User'),
    Address: mongoose.model('Address'),
    Dish: mongoose.model('Dish'),
    Order: mongoose.model('Order'),
    Review: mongoose.model('Review'),
    Tag: mongoose.model('Tag')
};

var toSeed = require('../../testingseed.js');

describe('Dish model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (!mongoose.connection.db) {
            mongoose.connect(dbURI);
        }
        return toSeed(models, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Dish).to.be.a('function');
    });

    describe('statics', function() {

        describe('findAllDishes', function() {

            it('should exist', function() {
                expect(Dish.findAllDishes).to.be.a('function');
            });

            it('should return an array of dishes', function() {
                Dish.findAllDishes().then(function(dishes) {
                    expect(dishes).to.have.length.above(0);
                });
            });

        });

        describe('findDish', function() {

            it('should exist', function() {
                expect(Dish.findDish).to.be.a('function');
            });

            it('should return one dish', function() {
                Dish.findDish({name: 'Thai Curry'}).then(function(dish) {
                    console.log('thai curry', dish)
                    expect(dish).to.have.length(1);
                });
            });

        });

        describe('findByTags', function() {

            it('should exist', function() {
                expect(Dish.findByTags).to.be.a('function');
            });

            it('should return an array of dishes', function() {
                Dish.findByTags().then(function(dishes) {
                    expect(dishes).to.have.length.above(0);
                });
            });

            it('should return dishes that match a single tag or array of tags', function() {
                Dish.findByTags(['Paleo', 'Organic']).then(function(dishes) {
                    expect(dishes).to.have.length(1);
                });
            });
        });

    });

})

