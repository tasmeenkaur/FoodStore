var mongoose = require('mongoose');

module.exports = mongoose.model('Foods', {
    name: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    }
});
