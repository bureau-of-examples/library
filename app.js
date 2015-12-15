"use strict";

var express = require('express');

var app = express();

var port = process.env.PORT || 9001;

app.use(express.static('public'));
app.set("views", './src/views');
app.set("view engine", 'jade');

app.get("/", function(req, res){
    res.render("index", {list: ['a', 'b']});
});

app.get("/books", function(req, res){
    res.send("Hello books!");
});

app.listen(port, function(err){
    console.log("Running server on port " + port);
});



