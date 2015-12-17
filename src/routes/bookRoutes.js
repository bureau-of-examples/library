"use strict";

var express = require('express');

var books = require('../modules/bookCollection');

var BookRouter = function(args){
    var bookRouter = express.Router();

    //should extend args
    args.title = "My Books";
    args.books = books;

    bookRouter.route("/")
        .get(function(req, res){
            res.render("books", args);
        });

    bookRouter.route("/:id")
        .get(function(req, res){
            var id = req.params.id;
            args.book = books[id];
            res.render("book", args);
        });

    return bookRouter;
};

module.exports = BookRouter;





