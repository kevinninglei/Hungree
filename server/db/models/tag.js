var mongoose = require('mongoose');
var Promise = require('bluebird');

var tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

tagSchema.statics.createMany = function(tags) {
    var self = this;
    var promiseArr = tags.map(function(tag) {
        return self.create({
            name: tag
        });
    });

    return Promise.all(promiseArr)
        .then(function(data) {
            return data
        })
        .then(null, function(err) {
            console.log(err)
        })
}

mongoose.model('Tag', tagSchema);