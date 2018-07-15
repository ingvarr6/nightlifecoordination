var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    id: String,
    going: {type: Number, default: 0}
});

module.exports = mongoose.model('Bar', Bar);