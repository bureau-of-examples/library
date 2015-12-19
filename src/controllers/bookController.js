var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/libraryApp';
var createViewModel = require('../modules/createViewModel');

var bookController = function(bookService){

    var getIndex = function(req, res){
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, books){
                var model = createViewModel();
                model.title = "My Books";
                model.books = books;
                res.render("books", model);
                db.close();
            });
        });
    };

    var getById = function(req, res){
        var id = new objectId(req.params.id);
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, book){
                var model = createViewModel();
                model.title = "Book Details";
                model.book = book;
                res.render("book", model);
                db.close();
            });
        });
    };

    var securityInterceptor = function(req, res, next){
        if(!req.user){
            res.redirect('/');
        } else {
            next();
        }
    };

    return {
        getIndex: getIndex,
        getById: getById,
        securityInterceptor: securityInterceptor
    };
};

module.exports = bookController;