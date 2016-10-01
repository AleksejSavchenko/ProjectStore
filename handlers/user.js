'use strict';

var UserHandler = function (db) {
    var userModelAndSchemaName = 'user';
    var purchaseModelAndSchemaName = 'purchase';
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schemas[userModelAndSchemaName];
    var purchaseSchema = mongoose.Schemas[purchaseModelAndSchemaName];
    var Model = db.model(userModelAndSchemaName, userSchema);
    var PurchaseModel = db.model(purchaseModelAndSchemaName, purchaseSchema);
    var ObjectId = mongoose.Types.ObjectId;

    this.addUser = function (req, res, next) {
        var options = req.body;
        var userLogin = options.login;
        var userPass = options.password;
        var userName = options.name;
        var userRole = options.role;
        var model;
        var customError;
        var saveData;

        if (!userLogin || !userPass || !userName) {
            customError = new Error('Login,Name or Pass is not define');
            customError.status = 400;
            return next(customError);
        }
        saveData = {
            login: userLogin,
            name: userName,
            password: userPass,
            role: userRole
        };
        model = new Model(saveData);
        model.save(function (error, model) {
            if (error) {
                return next(error);
            }
            var resultFin = {
                login: model.login,
                password: model.password
            };

            res.status(201).send(resultFin);
        })
    };
    this.getUsers = function (req, res, next) {
        var query = req.query;
        var page = query.page ? parseInt((query.page), 10) : 1;
        var count = query.count ? parseInt((query.count), 10) : 5;
        var skip = (page - 1) * count;

        Model.find({}, {__v: 0}).setOptions({skip: skip, limit: count}).exec(function (err, collections) {
            if (err) {
                return next(err);
            }
            res.status(200).send(collections)
        });
    };
    this.getUserById = function (req, res, next) {
        var customError;
        var login = req.body.login;
        //var userId = req.params.id;
        if (!login) {
            customError = new Error('BAD LOGIN');
            customError.status = 400;
            return next(customError);
        }
        Model.find({login: login}).exec(function (err, result) {
            if (err) {
                return next(err);
            }
            if (!result[0]) {
                customError = new Error('Haven`t user with login ' + login);
                customError.status = 400;
                return next(customError);
            }
            res.status(200).send(result)
        });
    };
    this.updateUser = function (req, res, next) {
        var id = ObjectId(req.params.id);
        var body = req.body;
        var saveData = {};
        var neededOptions = ['name', 'login', 'password', 'role'];

        for (var i in neededOptions) {
            if (body[neededOptions[i]]) {
                saveData[neededOptions[i]] = body[neededOptions[i]];
            }
        }

        Model.update({_id: id}, {$set: saveData}, function (err, model) {
            if (err) {
                return next(err);
            }
            res.status(201).send(model);
        });
    };
    this.deleteUser = function (req, res, next) {
        var userId = ObjectId(req.params.id);

        Model.findByIdAndRemove({_id: userId}, function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send({success: "Deleted success"});
        });
    };
    this.checkout = function (req, res, next) {
        var userId = ObjectId(req.session.user_id);
        var cart = req.session.cart;
        var customError;
        var saveData;

        if (!cart) {
            customError = new Error('CART IS EMPTY');
            customError.status = 400;
            return next(customError);
        }

        var temp = [];
        for (var i in cart) {
            temp.push(cart[i])
        }
        saveData = {
            purchases: temp,
            user: userId
        };
        var purchaseModel = new PurchaseModel(saveData);
        purchaseModel.save(function (err, model) {
            if (err) {
                return next(err);
            }

            req.session.cart = {};

            var resultFin = {
                user: model.user,
                purchases: model.purchases,
                date: model.date
            };
            res.status(200).send(resultFin)
        });
    };
    this.purchasesHistory = function (req, res, next) {
        var userId = req.session.user_id;
        var customError;
        PurchaseModel.find({user: userId}).exec(function (err, model) {
            if (err) {
                return next(err);
            }
            console.log(model);
            if (!model) {
                customError = new Error('U havent any goods in history');
                customError.status = 402;
                return next(customError);
            }
            res.status(200).send(model);
        });
    };
    this.deleteFromCart = function (req, res, next) {
        var goodId = req.params.id;
        var cart = req.session.cart;
        var customError;
        if (typeof(cart) == 'undefined') {
            customError = new Error('CART IS EMPTY');
            customError.status = 400;
            return next(customError);
        }
        for (var i = 0; i < cart.length; i++) {
            if (cart[i] === goodId) {
                delete cart[i];
                return res.status(200).send({success: "Deleted success"});
            }
        }
    };
    this.login = function (req, res, next) {
        var session = req.session;
        var body = req.body;
        var login = body.login;
        var pass = body.password;
        var customError;

        if (session.user_id) {
            customError = new Error('ALREADY LOGINED');
            customError.status = 400;

            return next(customError);
        }

        if (!login || !pass) {
            customError = new Error('U NEED LOGIN AND/OR PASS FOR LOGIN');
            customError.status = 400;

            return next(customError);
        }
        Model.findOne({login: login}).exec(function (err, user) {
            if (err) {
                next(err);
            }
            if (!user) {
                customError = new Error('Havent this user in DB');
                customError.status = 400;
                return next(customError);
            }
            if (user.password != pass) {
                customError = new Error('WRONG PASS');
                customError.status = 400;
                return next(customError);
            }

            session.user_name = user.name;
            session.user_id = user._id;
            session.user_role = user.role;

            res.status(200).send(user);
        });
    };
    this.logout = function (req, res, next) {
        req.session.destroy();
        res.status(200).send({success: "Logged out"});
    };
    this.currentUser = function (req, res, next) {
        var userId = ObjectId(req.session.user_id);
        Model.findById({_id: userId}).exec(function (err, model) {
            if (err) {
                return next(err);
            }
            console.log(model)
            res.status(200).send(model)
        });
    }
};
module.exports = UserHandler;
