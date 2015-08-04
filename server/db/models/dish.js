var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

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
    }],
    rating: {type: Number, default: 0},
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    archived: {type: Boolean, default: false}
});

dishSchema.plugin(deepPopulate, {});

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
    return this.findById(id).deepPopulate('tags reviews.user user').exec()
        .then(function(dish){
            return dish;
        })
        .then(null, function(err){
            throw err.message;
        });
}

mongoose.model('Dish', dishSchema);