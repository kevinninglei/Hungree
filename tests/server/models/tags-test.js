// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Dish = mongoose.model('Dish');
var Tag = mongoose.model('Tag');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');


describe('Tags model', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	
	describe('Authenticated request', function () {

		var loggedInAgent;

		var dishInfo = {
			name: 'Pizza',
			description: 'yumm'
		};

		var newDish;
		beforeEach('Create a user', function (done) {
		  Dish.create(dishInfo)
								.then(function (dish) {
									var tag = new Tag({name:'italian'});
									tag.save();
									dish.tags.push(tag);
									newDish = dish;
									done();
								})
		});

		describe('get all tags from database', function () {
			it('should assign one tag to a dish', function () {
				expect(newDish.tags.length).to.equal(1);
			});
			it('should get one tag from the database', function (done) {
				Tag.findOne({name: 'italian'}).exec()
					.then(function (tag) {
						expect(tag.name).to.equal('italian');
						done();
					})
					.then(null, function (err) {
						done(err);
					})

			})
		})

	})
})



