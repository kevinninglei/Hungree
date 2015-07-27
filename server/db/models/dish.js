var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    ingredients: [String],
    spiciness: {
        type: Number,
        min: 1,
        max: 5
    },
    description: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    price: Number,
    quantity: Number,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    picture: {
        type: String,
        default: 'http://mazwo.com/wp-content/uploads/2014/08/question-mark-made-of-food.jpg'
    }
});

mongoose.model('Dish', dishSchema);