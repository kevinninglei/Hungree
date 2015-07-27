'use strict';

var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  description: String,
  rating: {type: Number, min: 1, max:5}
  //Add userID?
});

mongoose.model('Review', reviewSchema);