/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

// var bluebird = require('bluebird');
var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Dish = mongoose.model('Dish');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');
var Tag = mongoose.model('Tag');
var q = require('q');


var addresses = [
    new Address({street: '87 Fredrick Drive', city: 'Monroe', state: 'NY', zip: 10950}),
    new Address({street: '5 Cameron Avenue', city: 'Somerville', state: 'MA', zip: 02144}),
    new Address({street: '126 Powder House Boulevard', city: 'Somerville', state: 'MA', zip: 02144}),
    new Address({street: '886 6th Avenue', city: 'New York', state: 'NY', zip: 10001}),
    new Address({street: '5 Hanover Square', city: 'New York', state: 'NY', zip: 10004}),
    new Address({street: 'Walt Disney World Resort', city: 'Orlando', state: 'FL', zip: 32830})
];

var tags = [
    new Tag({name: 'Japanese'}),
    new Tag({name: 'Korean'}),
    new Tag({name: 'Chinese'}),
    new Tag({name: 'American'}),
    new Tag({name: 'Vegetarian'}),
    new Tag({name: 'Vegan'}),
    new Tag({name: 'Gluten-free'}),
    new Tag({name: 'Italian'}),
    new Tag({name: 'Paleo'}),
    new Tag({name: 'Organic'})
];

var reviews = [
    new Review({description: 'This dish is incredible my taste buds are happy.', rating: 5}),
    new Review({description: 'This dish is disgusting my taste buds are sad.', rating: 1}),
    new Review({description: 'This dish is mediocre my taste buds are indifferent.', rating: 3})
];

var dishes = [
    new Dish({name: 'Thai Curry', ingredients: ['Coconut milk', 'chicken', 'bell peppers', 'fish sauce', 'thai curry paste', 'sugar'], spiciness: 4, description: 'This is good shit.', price: 10, quantity: 5, tags: [tags[0], tags[1], tags[2]], reviews: [reviews[0], reviews[2]]}),
    new Dish({name: 'Lasagna', ingredients: ['Pasta', 'chicken', 'bell peppers', 'tomato sauce', 'cheese', 'salt'], spiciness: 1, description: 'This is ok shit.', price: 8, quantity: 3, tags: [tags[1], tags[4], tags[5]], reviews: [reviews[1], reviews[2]]}),
    new Dish({name: 'Pizza', ingredients: ['Dough', 'chicken', 'bell peppers', 'tomato sauce', 'cheese', 'jalapenos'], spiciness: 3, description: 'This shit is bomb.', price: 15, quantity: 25, tags: [tags[8], tags[9], tags[10]], reviews: [reviews[0], reviews[1]]}),
    new Dish({name: 'Bulgogi', ingredients: ['Pear', 'beef', 'carrots', 'soy sauce', 'sesame oil', 'brown sugar', 'onion'], spiciness: 1, description: 'OMG.', price: 20, quantity: 2, tags: [tags[5], tags[9], tags[4]], reviews: [reviews[1]]})
];

var orders = [ //add userIds
    new Order({dishes: [{dishId: dishes[0], quantity: 1}, {dishId: dishes[1], quantity: 2}]}),
    new Order({dishes: [{dishId: dishes[2], quantity: 4}, {dishId: dishes[3], quantity: 1}]}),
    new Order({dishes: [{dishId: dishes[1], quantity: 3}, {dishId: dishes[2], quantity: 5}]})
];

var users = [
    new User({
        name: {first: 'KevinJustin', last: 'AnnieYves'},
        email: 'testing@fsa.com',
        password: 'password',
        facebook: null,
        google: null,
        admin: false,
        address: {shipping: addresses[0], lat: 41.3091229, lng: -74.2024038},
        billing: {billingAddress: addresses[1], number: 3245558323493406, ccv: 445, exp: {month: 10, year: 2015}, cardType: 'Visa'},
        dishes: [dishes[0], dishes[1]],
        favorites: [dishes[3], dishes[1]],
        orders: [orders[0]],
        reviews: [reviews[0], reviews[1]],
        status: 'online'
    }),
    new User({
        name: {first: 'Barack', last: 'Obama'},
        picture: 'http://a5.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwNzg5ODI4MTEw.jpg',
        email: 'obama@gmail.com',
        password: 'potus',
        facebook: null,
        google: null,
        admin: true,
        address: {shipping: addresses[2], lat: 42.404326, lng: -71.12380499999999},
        billing: {billingAddress: addresses[3], number: 6453965834530596, ccv: 997, exp: {month: 09, year: 2015}, cardType: 'MasterCard'},
        dishes: [dishes[2]],
        favorites: [dishes[0], dishes[1]],
        orders: [orders[1], orders[2]],
        reviews: [reviews[2]],
        status: 'offline'
    }),
        new User({
        name: {first: 'Crazy', last: 'Eyes'},
        picture: 'http://nerdylittlesecret.com/main/wp-content/uploads/2013/08/warren_susanna_2227.jpg',
        email: 'testin2g@fsa.com',
        password: 'password',
        facebook: null,
        dishes:[dishes[3]],
        google: null,
        admin: false,
        address: {shipping: addresses[4], lat: 41.3091229, lng: -74.2024038},
        status: 'busy'
    }),
];

orders[0].userId = users[0];
orders[1].userId = users[1];
orders[2].userId = users[1];

var models = [User, Address, Dish, Order, Review, Tag];
var data = [users, addresses, dishes, orders, reviews, tags];


var wipeDB = function() {
    models.forEach(function(model) {
        model.find({}).remove(function() {});
    });

    return q.resolve();
};

var seed = function() {
    var promiseArr = models.map(function(currModel, index){
        return currModel.create(data[index]);
    })
    q.all(promiseArr)
        .then(function(data){
            console.log("database seeded!");
            process.kill(0)
        })
        .then(function(err){
            console.log("error! is: ", err.message);
            process.kill(0)
        })
};

connectToDb.then(function() {
    wipeDB().then(seed);
})
.then(null, function(err) {
    console.error(err);
});
