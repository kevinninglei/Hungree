'use strict';
var mongoose = require('mongoose');
var addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: Number
})

mongoose.model('Address', addressSchema);