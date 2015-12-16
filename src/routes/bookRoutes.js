"use strict";

var express = require('express');

var books = [
    {
        title:"War and Peace",
        genre: "Historical Fiction",
        author: "Lev Nikolayevich Tolstoy",
        read: false
    },
    {
        title: "Les Miserables",
        genre: "Historial Fiction",
        author: "Victor Hugo",
        read: false
    },
    {
        title: "The Time Machine",
        genre: "Science Fiction",
        author: "H. G. Wells",
        read: false
    },
    {
        title: "A journey into the Center of the Earth",
        genre: "Science Fiction",
        author: "Jules Verne",
        read: false
    }
];

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





