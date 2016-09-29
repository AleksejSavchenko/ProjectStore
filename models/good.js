'use strict';

module.exports = function() {
    var mongoose = require('mongoose');
    
    var schema = new mongoose.Schema({
        name:{type:String,require:true},
        price:{type:Number,require:true},
        category_id:{type:String,require:true}
       /* createdBy: {
            user: {type: ObjectId, ref: 'user', default: null},
            date: {type: Date, default: new Date()}
        },
        editedBy: {
            user: {type: ObjectId, ref: 'user', default: null},
            date: {type: Date, default: new Date()}
        }*/
    }, {collection: 'goods'});
    
    mongoose.model('good', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.good = schema;
}();