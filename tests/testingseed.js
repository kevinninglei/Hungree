module.exports = function(models, done) {
    var User = models.User;
    var Address = models.Address;
    var Dish = models.Dish;
    var Order = models.Order;
    var Review = models.Review;
    var Tag = models.Tag;
    var q = require('q');

    var addresses = [
        new Address({street: '123 Sesame Street', city: 'Boston', state: 'MA', zip: 02144}),
        new Address({street: '20 Boop Ave', city: 'Monroe', state: 'NY', zip: 10950}),
        new Address({street: '13 Atlantic Ave', city: 'New York', state: 'NY', zip: 10001}),
        new Address({street: '65 Sunview Drive', city: 'San Francisco', state: 'CA', zip: 43513}),
        new Address({street: '50 Cowboy Road', city: 'Dallas', state: 'TX', zip: 99657}),
        new Address({street: '1300 Plastic Surgey Boulevard', city: 'Seoul', state: 'Korea', zip: 10242}),
        new Address({street: '4604 Ski Road', city: 'Somewhere', state: 'Montana', zip: 00234}),
        new Address({street: '324 Fredrick Drive', city: 'Tampa', state: 'FL', zip: 43564})
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
        {
            name: {first: 'KevinJustin', last: 'AnnieYves'},
            email: 'testing@fsa.com',
            password: 'password',
            facebook: null,
            google: null,
            admin: false,
            shippingAddress: addresses[0],
            billing: {billingAddress: addresses[1], number: 3245558323493406, ccv: 445, exp: {month: 10, year: 2015}, cardType: 'Visa'},
            dishes: [dishes[0], dishes[1]],
            favorites: [dishes[3], dishes[1]],
            orders: [orders[0]],
            reviews: [reviews[0], reviews[1]]
        },
        {
            name: {first: 'Barack', last: 'Obama'},
            email: 'obama@gmail.com',
            password: 'potus',
            facebook: null,
            google: null,
            admin: true,
            shippingAddress: addresses[2],
            billing: {billingAddress: addresses[3], number: 6453965834530596, ccv: 997, exp: {month: 09, year: 2015}, cardType: 'MasterCard'},
            dishes: [dishes[2], dishes[3]],
            favorites: [dishes[0], dishes[1]],
            orders: [orders[1], orders[2]],
            reviews: [reviews[2]]
        }
    ];

    orders[0].userId = users[0];
    orders[1].userId = users[1];
    orders[2].userId = users[1];

    var wipeDB = function() {
        var modelArr = [User, Address, Dish, Order, Review, Tag];
        modelArr.forEach(function(model) {
            model.find({}).remove(function() {});
        });

        return q.resolve();
    };

    var seed = function() {
        q.all(
            User.create(users, function(err) {
                if (err) console.error(err);
            }),
            Address.create(addresses, function(err) {
                if (err) console.error(err);
            }),
            Dish.create(dishes, function(err) {
                if (err) console.error(err);
            }),
            Order.create(orders, function(err) {
                if (err) console.error(err);
            }),
            Review.create(reviews, function(err) {
                if (err) console.error(err);
            }),
            Tag.create(tags, function(err) {
                if (err) console.error(err);
            })
        )
        .then(function() {
            done();
        })
        .then(null, function(err) {
            console.error(err);
        })
    };

    return wipeDB().then(seed);
}