
var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books = require('../modules/bookCollection');

var router = function(){

    adminRouter.route("/books/add")
        .get(function(req, res){
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results){
                    db.close();
                    if(!results){
                        res.json(err);
                    }
                    res.redirect('/books');
                });
            });
        });
    return adminRouter;
};

module.exports = router;