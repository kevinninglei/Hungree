'use strict';

var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  description: String,
  rating: {type: Number, min: 1, max:5}
  //Add userID?
});

//i am a review, go to list of users, does my id exist in their array of reviews
reviewSchema.method.getUserForReview = function (cb) {
	console.log(this.model('User'));
	return this.model('User').findOne({'reviews' : {$in: this._id}});
}

mongoose.model('Review', reviewSchema);