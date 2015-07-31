// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var models = {
	User: mongoose.model('User'),
	Address: mongoose.model('Address'),
	Dish: mongoose.model('Dish'),
	Order: mongoose.model('Order'),
	Review: mongoose.model('Review'),
	Tag: mongoose.model('Tag')
};

var toSeed = require('../../testingseed.js');

var Dish = mongoose.model('Dish');

describe('Dish route', function() {
	var loggedInAgent;

	beforeEach('Establish DB connection', function(done) {
		loggedInAgent = supertest.agent(app);

		if (!mongoose.connection.db) {
			mongoose.connect(dbURI);
		}
		return toSeed(models, done);
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	var newDish;
	beforeEach('Retrieve a dish', function(done) {
		return Dish.findOne({
				name: 'Thai Curry'
			}).exec()
			.then(function(dish) {
				newDish = dish;
				done();
			});
	});

	describe('GET requests', function() {

		it('/api/dishes should get with 200 response and an array as the body', function(done) {
			loggedInAgent.get('/api/dishes').expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.have.length(4);
				done();
			});
		});

		it('/api/dishes/:id gets one dish by the id', function(done) {
			loggedInAgent.get('/api/dishes/' + newDish._id).expect(200).end(function(err, res) {
				if (err) return done(err)
				expect(res.body.name).to.equal('Thai Curry');
				done();
			});
		});

		it('/api/dishes/:id/reviews should get with 200 response and with an array as the body', function(done) {
			loggedInAgent.get('/api/dishes/' + newDish._id + '/reviews').expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.have.length(2);
				done();
			});
		});

	});

	var postDish = {
		name: 'Blubbity Goop',
		description: 'Woot woot'
	};

	describe('POST request', function() {

		it('creates a new dish', function(done) {
			loggedInAgent.post('/api/dishes').send(postDish).expect(201).end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('Blubbity Goop');
				done();
			});
		});

	});

	describe('PUT request', function() {

		it('updates a dish', function(done) {
			loggedInAgent.put('/api/dishes/' + newDish._id).send(postDish).expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('Blubbity Goop');
				done();
			});
		});

		it('returns an error if user doesn\'t exist', function(done) {
			loggedInAgent.put('/api/dishes/abc123boop').send(postDish).expect(200).end(function(err, res) {
				expect(err).to.not.equal(null);
				done();
			});
		});

	});

	describe('DELETE request', function() {

		it('deletes a dish', function(done) {
			loggedInAgent.delete('/api/dishes/' + newDish._id).expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body.message).to.equal('Successfully deleted!');
				done();
			});
		});

		it('deletes a user', function(done) {
			loggedInAgent.delete('/api/dishes/abc123boop').expect(200).end(function(err, res) {
				expect(err).to.not.equal(null);
				done();
			});
		});

	});

});