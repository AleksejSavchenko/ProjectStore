'use strict';

module.exports = function() {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = new mongoose.Schema({
        name: {type: String, unique: true}
       /* createdBy: {
            user: {type: ObjectId, ref: 'user', default: null},
            date: {type: Date, default: new Date()}
        },
        editedBy: {
            user: {type: ObjectId, ref: 'user', default: null},
            date: {type: Date, default: new Date()}
        }*/

    }, {collection: 'categories'});

    schema.index({name:1},{unique:true});

    mongoose.model('category', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.category = schema;
}();