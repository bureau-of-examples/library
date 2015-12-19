var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/libraryApp';

authRouter.route('/signUp')
    .post(function (req, res) {

        mongodb.connect(url, function(err, db){
            var collection = db.collection('users');
            var user = {
                username: req.body.username,
                password: req.body.password
            };

            collection.insert(user, function(err, results){
                req.login(results.ops[0], function () {
                    res.redirect('/auth/profile');
                });
            });
        });
    });

authRouter.route('/profile')
    .all(function(req, res, next){
        if(!req.user){
            res.redirect('/');
        } else {
            next();
        }
    })
    .get(function (req, res) {
        res.json(req.user);
    });

authRouter.route('/signIn')
    .post(
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req, res){
        res.redirect('/auth/profile');
    });

module.exports = function () {
    return authRouter;
};

