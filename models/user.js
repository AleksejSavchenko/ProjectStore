'use strict';

module.exports = function() {
    var mongoose = require('mongoose');
    //var ObjectId = mongoose.Schema.Types.ObjectId;

    var schema = new mongoose.Schema({
        login:{type:String,require:true,unique:true},
        password:{type:String,require:true},
        name: {type: String, require: true},
        role: {type: String,enum:['admin','user'], default: 'user'}
       /* createdBy: {
            user: {type: ObjectId, ref: 'user', default: null},
         itedBy: {
        date: {type: Date, default: new Date()}
        },
        ed user: {type: ObjectId, ref: 'user', default: null},
            date: {type: Date, default: new Date()}
        }*/
    }, {collection: 'users'});
    
    mongoose.model('user', schema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.user = schema;
}();