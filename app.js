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

var menuItems = [{link:"/books", text: "Books"}, {link:"/authors", text:"Authors"}];

var BookRouter = require("./src/routes/bookRoutes");
var AdminRouter = require("./src/routes/adminRoutes");

app.use("/books", BookRouter({menuItems: menuItems}));
app.use("/admin", AdminRouter({menuItems: menuItems}));

app.get("/home", function(req, res){
    res.render("home", {title: "Hello from render", menuItems: menuItems});
});

app.listen(port, function(err){
    console.log("Running server on port " + port);
});





