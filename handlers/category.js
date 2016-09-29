'use strict';

var CategoryHandler = function (db) {
    var categoryModelAndSchemaName = 'category';
    var mongoose = require('mongoose');
    var schema = mongoose.Schemas[categoryModelAndSchemaName];
    var Model = db.model(categoryModelAndSchemaName, schema);

    this.addCategory = function (req, res, next) {
        var categoryName = req.body.name;
        var customError;
        var saveData;
        var model;

        if (!categoryName) {
            customError = new Error('Name is not define');
            customError.status =400;
            return next(customError);
        }
        saveData = {
            name: categoryName
        };

        model = new Model(saveData);
        model.save(function (error, model) {

            if (error) {
                return next(error);
            }
            var resultFin = {
                _id: model._id,
                name: model.name
            };

            res.status(201).send(resultFin);
        })
    };
    this.getCategories = function (req, res, next) {
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
    this.getCategoryById = function (req, res, next) {
        var categoryId = req.params.id;

        Model.findById(categoryId).exec(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send(result)
        });
    };
    this.updateCategory = function (req, res, next){
        var categoryName = req.body.name;
        var categoryId = req.params.id;

        Model.update({_id: categoryId},{name :categoryName},{new: true}, function (err, model) {
            if (err) {
                return next(err);
            }
            res.status(201).send(model);
        });
    };
    this.deleteCategory = function (req, res, next) {
        var categoryId = req.params.id;
        Model.findByIdAndRemove(categoryId,function (error) {
            if (error) {
                return next(error);
            }
            res.status(200).send({success: "Deleted success"});
        })
    };
};
module.exports = CategoryHandler;