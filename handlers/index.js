'use strict';

var requestHandler = function (req,res,next,isLoginRequired,isAdminRequired,isUserRequired, callback, db) {
  
    var userModelAndSchemaName = 'user';
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schemas[userModelAndSchemaName];
    var Model = db.model(userModelAndSchemaName, userSchema);
    var customError;

    if(isLoginRequired) {
        if(typeof(req.session.user_id)=='undefined'){
            customError = new Error('User is not LOGINED');
            customError.status = 400;
            return next(customError);
        }
    }
    Model.findById(req.session.user_id, function(error,user) {

        if (isAdminRequired) {
            if (!isUserAdmin(user, next)) {
                return;
            }
        }

        if (isUserRequired) {
            if (!isUserUser(user, next)) {
                return;
            }
        }
        callback(req,res,next);
    });
};
function isUserAdmin(user,next){
    var customError;

    if(user.role !=  'admin'){
        customError = new Error('User is not ADMIN');
        customError.status = 400;
        return next(customError);
    }
    return true;
}
function isUserUser(user,next){
    var customError;

    if(user.role != 'user'){
        customError = new Error('User is not USER');
        customError.status = 400;
        return next(customError);
    }
    return true;
}
module.exports = requestHandler;