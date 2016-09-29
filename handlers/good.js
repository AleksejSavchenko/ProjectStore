'use strict';

var GoodHandler = function (db) {
    var goodModelAndSchemaName = 'good';
    var mongoose = require('mongoose');
    var schema = mongoose.Schemas[goodModelAndSchemaName];
    var Model = db.model(goodModelAndSchemaName, schema);
    var ObjectId = mongoose.Types.ObjectId;

    this.addGood = function (req, res, next) {
        var options = req.body;
        var goodPrice = options.price;
        var goodCategory = options.category_id;
        var goodName = options.name;
        var customError;
        var saveData;
        var model;

        if (!goodName || !goodPrice||!goodCategory) {
            customError = new Error('Name,CategoryID or Price is not define');
            customError.status = 400;
            return next(customError);
        }
        saveData = {
            name: goodName,
            price: goodPrice,
            category_id: goodCategory
        };
        model = new Model(saveData);
        model.save(function (err) {
            if (err) {
                return next(err);
            }
            var resultFin = {
                _id: model._id,
                price:model.price,
                name: model.name
            };

            res.status(201).send(resultFin);
        });
    };
    this.getGoodById = function (i,req, res, next) {
        var goodId;
        if(i){
            goodId = ObjectId(i);
        }else {
            goodId = ObjectId(req.params.id);
        }
            var customError;

            Model.findById({_id: goodId}).exec(function (err, result) {
                if (err) {
                    return next(err);
                }
                if (!Model || !Model.id) {
                    customError = new Error('Good cant find');
                    customError.status = 404;
                }
                res.status(200).send(result);
            });

    };
    this.updateGood = function (req, res, next) {
        var body = req.body;
        var goodId = ObjectId(req.params.id);
        var saveData = {};
        var neededOptions = ['name', 'price', 'category_id'];

        for(var i in neededOptions) {
            if(body[neededOptions[i]]) {
                saveData[neededOptions[i]] = body[neededOptions[i]];
            }
        }

        Model.update({_id:goodId},{$set:saveData}, function (err, model) {
            if (err) {
                return next(err);
            }
            res.status(201).send(model);
        });
    };
    this.deleteGood = function (req, res, next) {
        var goodId = ObjectId(req.params.id);
        var customError;
        Model.findByIdAndRemove(goodId,function (error) {
                if (error) {
                    return next(error);
                }
                
                res.status(200).send({success: "Deleted success"});
            })
    };
    this.getGoods = function (req, res, next) {
        var query = req.query;
        var page = query.page ? parseInt((query.page),10) : 1;
        var count = query.count ? parseInt((query.count),10) : 5;
        var skip = (page - 1)*count;
        Model.find({},{__v:0}).setOptions({skip:skip,limit:count}).exec(function (err, collections) {
            if (err) {
                return next(err);
            }
            res.status(200).send(collections)
        });
    };
    this.changeCart = function (req, res, next) {
        var body = req.body;
        var goodId = ObjectId(req.params.id);
        var cart = req.session.cart;
        var goodQuantity;
        var customError;
        var temp = parseInt((body.quantity),10);

        if(body.quantity&&temp) {
            goodQuantity = temp;
        } else {
            goodQuantity = 1;
        }

        if(typeof(cart) =='undefined'){
            cart = {};
        }
        Model.find({_id:goodId}).exec(function(err,good) {
            if (err) {
                return next(err);
            }
            if (good.length==0) {
                customError = new Error("HAVENT GOOD WITH ID " + goodId);
                customError.status = 400;
                return next(customError);
            }
            if(typeof cart[goodId] == 'undefined') {
                if (goodQuantity <= 0) {
                    customError = new Error('CANT SET NEGATIVE QUANTITY');
                    customError.status = 400;
                    return next(customError);
                } else {
                    cart[goodId] = {
                        quantity: goodQuantity,
                        name:good[0]._doc.name
                    }
                }
            } else {
                if (goodQuantity < 0) {
                    if (cart[goodId].quantity <= Math.abs(goodQuantity)) {
                        customError = new Error('U CANT REMOVE ' + Math.abs(goodQuantity) + ' GOOD FROM U CART');
                        customError.status = 400;
                        return next(customError);
                    } else {
                        cart[goodId].quantity += goodQuantity;
                        cart[goodId].name = good[0]._doc.name;

                    }
                } else{
                    console.log(good);
                    cart[goodId].quantity += goodQuantity;
                    cart[goodId].name = good[0]._doc.name;

                }
            }
            req.session.cart = cart;
            res.status(200).send(req.session.cart);
        });
    };
    this.getCart = function(req,res,next){
        //var customError;
        var cart = req.session.cart;
        var result = [];
        // if(typeof(cart) == 'undefined'){
        //     customError = new Error('CART IS EMPTY');
        //     customError.status = 400;
        //     return next(customError);
        // }
        for(var i in cart){
            result.push({
                _id:i,
                name:cart[i].name,
                quantity:cart[i].quantity
            })
        }

        res.status(200).send(result);
    };
    this.deleteFromCart = function(req,res,next) {
        var goodId = req.params.id;
        var cart = req.session.cart;
        var customError;
        if(typeof(cart) =='undefined'){
            customError = new Error('CART IS EMPTY');
            customError.status = 400;
            return next(customError);
        }else {
            for (var i in cart) {
                if (i === goodId) {
                    delete cart[i];
                    break;
                }
            }
            res.status(200).send({success: "Deleted success"});
        }
    };
    this.getGoodByCategory = function(req,res,next) {
        var categoryId = ObjectId(req.params.id);
        var customError;

        Model.find({category_id: categoryId}).exec(function (err, result) {
            if (err) {
                return next(err);
            }
            if (!Model || !Model.category_id) {
                customError = new Error('GOOD DONT FIND');
                customError.status = 404;
            }
            res.status(200).send(result);
        });
    };
};
module.exports = GoodHandler;