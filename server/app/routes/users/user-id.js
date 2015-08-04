'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Dish = mongoose.model('Dish');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var Address = mongoose.model('Address');
var router = require('express').Router();
var _ = require('lodash');
var bluebird = require('bluebird');

router.get('/', function(req, res, next) {
    Address.populate(req.CurrentUser, {
        path: 'address.shipping'
    })
        .then(function(data) {
            res.json(data);
        })
        .then(null, next);
});

router.get('/dishes', function(req, res, next) {
    Dish.populate(req.CurrentUser, {
        path: 'dishes'
    })
        .then(function(data) {
            res.json(data.dishes);
        })
        .then(null, next);
});

router.get('/address', function(req, res, next) {
    Address.populate(req.CurrentUser, {
        path: 'address.shipping'
    })
        .then(function(data) {
            res.json(data.address);
        })
        .then(null, next);
});

//gets the reviews that the user has written
router.get('/reviews', function(req, res, next) {
    User.populate(req.CurrentUser, {
        path: 'reviews'
    })
        .then(function(data) {
            return Dish.populate(data.reviews, {
                path: 'dish'
            })
        })
        .then(function(result) {
            res.json(result);
        })
        .then(null, next);

});

router.get('/orders', function(req, res, next) {
    Order.populate(req.CurrentUser, {
        path: 'orders'
    })
        .then(function(user) {
            return user.orders;
        })
        .then(function(orders) {
            return Dish.populate(orders, {
                path: 'dishes.dishId'
            });
        })
        .then(function(popOrder) {
            return Review.populate(popOrder, {
                path: 'dishes.dishId.reviews'
            });
        })
        .then(function(result) {
            res.json(result);
        })
        .then(null, next);
});

router.get('/receivedorders', function(req, res, next) {
    Order.populate(req.CurrentUser, {
        path: 'receivedOrders'
    })
        .then(function(user) {
            return user.receivedOrders;
        })
        .then(function(receivedOrders) {
            return Dish.populate(receivedOrders, {
                path: 'dishes.dishId'
            });
        })
        .then(function(popOrder) {
            return Review.populate(popOrder, {
                path: 'dishes.dishId.reviews'
            });
        })
        .then(function(result) {
            res.json(result);
        })
        .then(null, next);
});

/*

1. need to find the order in db using order id
2. need to find the appropriate dish object that matches (using req)
3. need to update the dish object from 'pending to complete'
4. need to save the order and return the recieved orders of the chef again
*/
router.put('/receivedorders/update', function(req, res, next) {
    var order = req.body.order;
    var dish = req.body.dish;
    var status = req.body.status;

    Order.findById(order._id).exec()
        .then(function(order) {
            order.dishes.forEach(function(dishObj) {
                if (String(dishObj.dishId) === dish._id) {
                    console.log(status);
                    dishObj.status = status;
                }
            })
            console.log('ending res now.. for order', order);
            return order.save();
        })
        .then(function(order) {

            return order.populate('dishes.dishId user').execPopulate();
        })
        .then(function(order) {
            res.json(order);
        })
        .then(null, next);
});


router.get('/favorites', function(req, res, next) {
    Dish.populate(req.CurrentUser, {
        path: 'favorites'
    })
        .then(function(data) {
            res.json(data.favorites);
        })
        .then(null, next);
});

router.get('/cart', function(req, res, next) {
    Order.findById(req.CurrentUser.cart).populate('dishes.dishId').exec()
        .then(function(order) {
            res.json(order);
        })
        .then(null, next);
});

router.put('/cart/add', function(req, res, next) {
    var newDishObj = {
            dishId: req.body.dish,
            quantity: req.body.quantity
        }
        //--> if user has an existing cart(order), then push the dish + quantity and save
        // the user///and res.respond with dish
        //--> if the user doesn't have an existing cart(order), create a cart with the single dish
        // then save the user...and res.respond with dish
    if (!req.CurrentUser.cart) {
        Order.create({
            user: req.CurrentUser._id,
            dishes: [newDishObj]
        })
            .then(function(order) {
                //now that you have the order, you must save it to the current user
                req.CurrentUser.cart = order;
                return req.CurrentUser.save();
            })
            .then(function(user) {
                res.json(user.cart);
            })
            .then(null, next);
    } else {
        Order.findById(req.CurrentUser.cart._id).exec()
            .then(function(order) {

                order.dishes.push(newDishObj);
                return order.save();
            })
            .then(function(order) {
                res.json(order);
            })
            .then(null, next);
    }
});

//to remove dishes from an order you want to:
// 1. retrieve the order
// 2. remove the orders that are passed in
router.put('/cart/remove', function(req, res, next) {
    var removeDishIds = req.body.dishesToRemove;
    Order.findById(req.CurrentUser.cart._id).exec()
        .then(function(order) {

            var dishesToSave = [];
            order.dishes.forEach(function(dish, index) {
                if (!(removeDishIds.indexOf(String(dish.dishId)) >= 0)) {
                    dishesToSave.push(dish);
                }
            });

            order.dishes = dishesToSave;
            return order.save();
        })
        .then(function(order) {
            order.populate('dishes.dishId', function(err, newOrder) {
                res.json(newOrder);
            })
        })

    .then(null, next);

});

router.put('/cart/update', function(req, res, next) {
    Order.findById(req.CurrentUser.cart._id).exec()
        .then(function(order) {
            order.dishes.forEach(function(dish, index) {
                var newQuan = req.body.dishesToUpdate[String(dish.dishId)];
                if (newQuan) {
                    dish.quantity = Number(newQuan);
                }
            });
            return order.save();
        })
        .then(function(order) {
            return order.populate('dishes.dishId').execPopulate();
        })
        .then(function(order) {
            console.log(order);
            res.json(order);
        })
        .then(null, next);
});

//checkout is going to just modify the user
//by adding the cart to the dishes and removing cart
router.delete('/cart/checkout', function(req, res, next) {
    //for every dish in the user's cart
    //we need to:
    // 1. find the appropriate chef
    // 2. push the order 
    //console.log(req.CurrentUser.cart);

    //there's a problem when in one order you have
    //multiple dishes from same user
    var cart;
    req.CurrentUser.cart.populate('dishes.dishId').execPopulate()
        .then(function(populatedCart) {
            cart = populatedCart;
            var chefPromArr = [];
            populatedCart.dishes.forEach(function(dishObj) {
                chefPromArr.push(User.findById(dishObj.dishId.user).exec());
            });
            return Promise.all(chefPromArr);
        })
        .then(function(arr_chefs) {

            //GIVE THE CHEF THE ORDER
            var chefPromArr = [];
            arr_chefs.forEach(function(chef) {
                chef.receivedOrders.push(cart);
                chefPromArr.push(chef.save());
            });

            return Promise.all(chefPromArr);
        })
        .then(function(saved_arr_chefs) {

            //DELETE CART AND FINISH CHECKOUT
            req.CurrentUser.orders.push(req.CurrentUser.cart);
            req.CurrentUser.cart = undefined;
            return req.CurrentUser.save();
        })
        .then(function(user) {
            res.json(user);
        })
        .then(null, next);

    // PRE CHECKOUT CODE
    // req.CurrentUser.orders.push(req.CurrentUser.cart);
    // req.CurrentUser.cart = undefined;
    // req.CurrentUser.save()
    // 	.then(function(user){
    // 		res.json(user);
    // 	})
    // 	.then(null, next);
});


router.put('/', function(req, res, next) {
    _.extend(req.CurrentUser, req.body);
    req.CurrentUser.save()
    // User.findByIdAndUpdate(req.CurrentUser._id, req.body, { new: true }).exec()
    .then(function(user) {
        res.status(200).json(_.omit(user, ['password', 'salt']));
    })
        .then(null, next);
});

router.put('/password', function(req, res, next) {
    if (req.CurrentUser.password !== User.encryptPassword(req.body.old, req.CurrentUser.salt))
        res.status(200).json({
            status: 403,
            message: 'The password you have entered is incorrect.'
        });
    else {
        _.extend(req.CurrentUser, {
            password: req.body.new
        });
        req.CurrentUser.save()
        // User.findByIdAndUpdate(req.CurrentUser._id, req.body, { new: true }).exec()
        .then(function(user) {
            res.status(200).json({
                status: 200,
                message: 'Password updated.',
                user: user
            });
        })
            .then(null, next);
    }
});



router.delete('/', function(req, res, next) {
    //NEed to loop through
    //	- Reviews
    //	- Dishes
    //  - Orders
    // and delete if user._id is found
    // /!\ We are keeping the reviews and orders associated with the deleted Dish
    // So that customers can refer back to them
    // We'll add a "dish was deleted by Chef" message
    req.CurrentUser.remove()
        .then(function() {
            res.status(200).json({
                message: 'Successfully deleted!'
            })
        })
        .then(null, next);
});

module.exports = router;