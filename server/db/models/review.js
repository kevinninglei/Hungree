'use strict';



var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  description: String,
  rating: {type: Number, min: 1, max:5},
  //Add userID?
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  dish: {type:mongoose.Schema.ObjectId, ref:'Dish'},
  date: {type: Date, default: Date.now()}
});

//i am a review, go to list of users, does my id exist in their array of reviews

mongoose.model('Review', reviewSchema);