var express = require('express');
var router = express.Router();
var GoodHandler = require('../handlers/good');
var requestHandler = require('../handlers/');

module.exports = function (app) {
    var db = app.db;
    var goodHandler = new GoodHandler(db);
    
    router.get('/by_id/:id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, goodHandler.getGoodById, db);
    });
    router.get('/category/:id',  function (req, res, next) {
        requestHandler(req, res, next, true, true, false, goodHandler.getGoodByCategory, db);
    });
    router.get('/',  function (req, res, next) {
        requestHandler(req, res, next, true, false, false, goodHandler.getGoods, db);
    });
    router.patch('/cart/:id', function (req, res, next) {
        requestHandler(req, res, next, true, false, true,goodHandler.changeCart, db);
    });
    router.delete('/cart/:id', function (req, res, next) {
        requestHandler(req, res, next, true, false, true, goodHandler.deleteFromCart, db);
    });
    router.get('/cart', function (req, res, next) {
        requestHandler(req, res, next, true, false, true, goodHandler.getCart, db);
    });
    router.post('/',  function (req, res, next) {
        requestHandler(req, res, next, true, true, false, goodHandler.addGood, db);
    });
    router.patch('/:id',  function (req, res, next) {
        requestHandler(req, res, next, true, true, false, goodHandler.updateGood, db);
    });
    router.delete('/:id',  function (req, res, next) {
        requestHandler(req, res, next, true, true, false, goodHandler.deleteGood, db);
    });
    return router;
};