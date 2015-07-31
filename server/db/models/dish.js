var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    ingredients: [String],
    spiciness: {
        type: Number,
        min: 1,
        max: 5
    },
    description: String,
    //available dishes
    price: Number,
    inventory: Number,
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }],
    picture: {
        type: String,
        default: 'http://mazwo.com/wp-content/uploads/2014/08/question-mark-made-of-food.jpg'
    },
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Review'
    }]
});

//@params: tags: [String]
dishSchema.statics.findByTags = function(tags){
    return this.find({}).populate('tags', null, { name: { $in: tags } }).exec()
        .then(function(dishes){
            return dishes.filter(function(dish) {
                return dish.tags.length === tags.length;
            });
        })
        .then(null, function(err){
            throw err.message;
        });
}

dishSchema.statics.findAllDishes = function(){
    return this.find().populate('tags reviews').exec()
        .then(function(dishes){
            return dishes;
        })
        .then(null, function(err){
            throw err.message;
        });
}

dishSchema.statics.findDish = function(id){
    return this.findById(id).populate('tags reviews').exec()
        .then(function(dish){
            return dish;
        })
        .then(null, function(err){
            throw err.message;
        });
}

dishSchema.virtual('rating').get(function() { //average rating
    return this.reviews.reduce(function(a,b) {
        return a.rating+b.rating;
    }) / this.reviews.length
})

mongoose.model('Dish', dishSchema);