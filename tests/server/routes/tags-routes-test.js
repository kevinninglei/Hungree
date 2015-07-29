var mongoose = require('mongoose');
require('../../../server/db/models');
var Dish = mongoose.model('Dish');
var Tag = mongoose.model('Tag');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Tags model', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	
	describe('Authenticated request', function () {

		var agent;

		var dishInfo = {
			name: 'Pizza',
			description: 'yumm',
			tags: []
		};

		var dishInfo2 = {
			name: 'Pasta',
			description: 'p',
			tags: []

		}

		beforeEach('Create a dish', function (done) {
			agent = supertest.agent(app)

			//adding tags to dishes
			var tag = new Tag({name:'italian'});
			dishInfo.tags.push(tag);
			dishInfo2.tags.push(tag);
			tag.save();

		  Dish.create(dishInfo)
				.then(function (dish) {
					return Dish.create(dishInfo2)
				})
				.then(function (dish2){
					done();
				})
		});

		describe('GET all tags', function () {
			it('successfully get all tags', function (done) {
				agent.get('/api/tags').expect(200).end(function (err, response) {
					if(err) return done(err);
					expect(response.body.length).to.equal(1);
					done();
				})
			})
			it('gets the correct tag name', function (done) {
				agent.get('/api/tags').expect(200).end(function (err, response) {
					if(err) return done(err);
					expect(response.body[0].name).to.equal('italian');
					done();
				})
			})
		})
		describe('GET tag', function () {
			it('successfully get all dish for tag', function (done) {
				agent.get('/api/tags/italian').expect(200).end(function (err, response) {
					if(err) return done(err);
					expect(response.body.length).to.equal(2);
					done();
				})
			})
		})
	})
})