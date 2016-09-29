'use strict';

var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/user');
var requestHandler = require('../handlers/');

module.exports = function (app) {
    var db = app.db;
    var userHandler = new UserHandler(db);

    router.post('/', function (req, res, next) {
        requestHandler(req, res, next, false, false, false, userHandler.addUser, db);
    });
    router.get('/', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, userHandler.getUsers, db);
    });
    router.patch('/:id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, userHandler.updateUser, db);
    });
    router.delete('/:id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, userHandler.deleteUser, db);
    });
    router.post('/by_id', function (req, res, next) {
        requestHandler(req, res, next, true, true, false, userHandler.getUserById, db);
    });
    router.post('/login', function (req, res, next) {
        requestHandler(req, res, next, false, false, false, userHandler.login, db);
    });
    router.get('/current_user', function (req, res, next) {
        requestHandler(req, res, next, true, false, false, userHandler.currentUser, db);
    });
    router.get('/logout', function (req, res, next) {
        requestHandler(req, res, next, true, false, false, userHandler.logout, db);
    });
    router.post('/purchases', function (req, res, next) {
        requestHandler(req, res, next, true, false, true, userHandler.checkout, db);
    });
    router.get('/purchases', function (req, res, next) {
        requestHandler(req, res, next, true, false, true, userHandler.purchasesHistory, db);
    });
    return router;
};