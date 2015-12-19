
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var url = 'mongodb://localhost:27017/libraryApp';
var mongodb = require('mongodb').MongoClient;

module.exports = function(){

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done){
        console.log("Looking up username: " + username);
        mongodb.connect(url, function(err, db){
            var collection = db.collection('users');
            collection.findOne({username: username}, function(err, results){
                var user = results;
                console.log("Found user:");
                console.log(user);
                if(user.password == password){
                    done(null, user);
                } else {
                    done(null, false, {message: 'Bad password'});
                }
            });
        });
    }));
};