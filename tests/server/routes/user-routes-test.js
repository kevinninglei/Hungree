// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('User Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	
	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

		var newUser;
		beforeEach('Create a user', function () {
			return User.create(userInfo)
								.then(function (user) {
									newUser = user;
								})
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		describe('GET request', function () {

			it('/api/users should get with 200 response and with an array as the body', function (done) {
				loggedInAgent.get('/api/users').expect(200).end(function (err, response) {
					if (err) return done(err);
					expect(response.body).to.an.array;
					done();
				});
			}); 


			it('gets one user by the id', function (done){
				loggedInAgent.get('/api/users/' + newUser._id).expect(200).end(function (err, res) {
					if (err) return done(err)
					expect(res.body.email).to.equal('joe@gmail.com');
					done();
				})
			});

			it('/api/users/:id/dishes should get with 200 response and with an array as the body', function (done) {
				loggedInAgent.get('/api/users/' + newUser._id +'/dishes').expect(200).end(function (err, response) {
					if (err) return done(err);
					expect(response.body).to.an.array;
					done();
				});
			});

			it('/api/users/:id/orders should get with 200 response and with an array as the body', function (done) {
				loggedInAgent.get('/api/users/' + newUser._id +'/orders').expect(200).end(function (err, response) {
					if (err) return done(err);
					expect(response.body).to.an.array;
					done();
				});
			});

			it('/api/users/:id/reviews should get with 200 response and with an array as the body', function (done) {
				loggedInAgent.get('/api/users/' + newUser._id +'/reviews').expect(200).end(function (err, response) {
					if (err) return done(err);
					expect(response.body).to.an.array;
					done();
				});
			}); 

		});

		var postUser = {
			email: 'yves@gmail.com',
			password: 'shoopdawoop'
		} ; 
		var dummyId = '55b7d9023841bfdca580555e';

		describe('POST request', function () {
			it('creates a new user',function (done){
				loggedInAgent.post('/api/users').send(postUser).expect(201).end(function(err,res){
					if(err) return done(err);
					expect(res.body.email).to.equal('yves@gmail.com');
					done();
				})
   
			})
		})

		describe('PUT request', function () {
			it('updates a user',function (done){
				loggedInAgent.put('/api/users/'+ newUser._id).send(postUser).expect(200).end(function(err,res){
					if(err) return done(err);
					expect(res.body.email).to.equal('yves@gmail.com');
					done();
				})
			})

			it('returns an error if user doesn\'t exist',function (done){
				loggedInAgent.put('/api/users/' + dummyId).send(postUser).expect(200).end(function(err,res){
					//console.log(res.error);
					expect(err).to.not.equal(null);
					done(); 
				})
			})
 
		});  
 
		describe('DELETE request', function () {
			it('deletes a user',function(done){
				loggedInAgent.delete('/api/users/'+ newUser._id).expect(200).end(function(err,res){
					if(err) return done(err);
					expect(res.body.message).to.equal('Successfully deleted!');
					done();
				})
			})

			it('deletes a user',function(done){
				loggedInAgent.delete('/api/users/'+ dummyId).expect(200).end(function(err,res){
					expect(err).to.not.equal(null);
					done(); 
				})
			})
		});
 
}); 

});
