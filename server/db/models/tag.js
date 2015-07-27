var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

mongoose.model('Tag', tagSchema);