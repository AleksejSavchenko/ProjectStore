var express = require('express');
var router = express.Router();
var CategoryHandler = require('../handlers/category');
var requestHandler = require('../handlers/');

module.exports = function (app) {
    var db = app.db;
    var categoryHandler = new CategoryHandler(db);
    
    router.get('/by_id/:id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, categoryHandler.getCategoryById, db);
    });
    router.get('/', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, categoryHandler.getCategories, db);
    });
    router.post('/', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, categoryHandler.addCategory, db);
    });
    router.patch('/:id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, categoryHandler.updateCategory, db);
    });
    router.delete('/:id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, categoryHandler.deleteCategory, db);
    });
    
    return router;
};