'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    admin: Boolean,
    shippingAddress: {type: mongoose.Schema.ObjectId, ref: 'Address'},

    billing: {
        billingAddress: {type: mongoose.Schema.ObjectId, ref: 'Address'},
        number: Number,
        ccv: Number,
        exp: Date,
        cardType: String
    },
    dishes: [{type: mongoose.Schema.ObjectId, ref: 'Dish'}],
    favorites: [{type: mongoose.Schema.ObjectId, ref: 'Dish'}],
    orders: [{type: mongoose.Schema.ObjectId, ref: 'Order'}],
    reviews: [{type: mongoose.Schema.ObjectId, ref: 'Review'}]

});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', userSchema);