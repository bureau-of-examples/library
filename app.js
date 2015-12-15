"use strict";

var express = require('express');

var app = express();

var port = process.env.PORT || 9001;

app.use(express.static('public'));
app.set("views", './src/views');

//app.set("view engine", 'jade');

//var handlebars = require('express-handlebars');
//app.engine(".hbs", handlebars({extname: '.hbs'}));
//app.set("view engine", ".hbs");

app.set("view engine", 'ejs');

app.get("/", function(req, res){
    res.render("index", {title: "Hello from render", list: ['a', 'b']});
});

app.get("/home", function(req, res){
    res.render("home", {title: "Hello from render", list: ['my item 1', 'my item 2']});
});

app.get("/books", function(req, res){
    res.send("Hello books!");
});

app.listen(port, function(err){
    console.log("Running server on port " + port);
});



