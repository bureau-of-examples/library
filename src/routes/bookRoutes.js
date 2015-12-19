"use strict";

var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var BookRouter = function(args){
    var bookRouter = express.Router();

    bookRouter.use(function(req, res, next){
        if(!req.user){
            res.redirect('/');
        } else {
            next();
        }
    });

    bookRouter.route("/")
        .get(function(req, res){
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.find({}).toArray(function(err, books){
                    //should extend args
                    args.title = "My Books";
                    args.books = books;
                    res.render("books", args);
                    db.close();
                });
            });
        });

    bookRouter.route("/:id")
        .get(function(req, res){
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.findOne({_id: id}, function(err, book){
                    //should extend args
                    args.book = book;
                    res.render("book", args);
                    db.close();
                });
            });
        });

    return bookRouter;
};

module.exports = BookRouter;





