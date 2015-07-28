var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Order = mongoose.model('Order');

var models = {
    User: mongoose.model('User'),
    Address: mongoose.model('Address'),
    Dish: mongoose.model('Dish'),
    Order: mongoose.model('Order'),
    Review: mongoose.model('Review'),
    Tag: mongoose.model('Tag')
};

var toSeed = require('../../testingseed.js');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) {
            return toSeed(models, done);
        }
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

})