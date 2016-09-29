'use strict';

module.exports = function() {
    var mongoose = require('mongoose');

    var schema = new mongoose.Schema({
        purchases:{},
        user:{type:String},
        date: {type: Date, default: new Date}
    }, {collection: 'purchases'});
    
    mongoose.model('purchase', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.purchase = schema;
}();

