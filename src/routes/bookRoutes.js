"use strict";

var express = require('express');

var BookRouter = function(){

    var BookController = require('../controllers/bookController');
    var bookController = BookController(null);

    var bookRouter = express.Router();
    bookRouter.use(bookController.securityInterceptor);

    bookRouter.route("/")
        .get(bookController.getIndex);

    bookRouter.route("/:id")
        .get(bookController.getById);

    return bookRouter;
};

module.exports = BookRouter;





