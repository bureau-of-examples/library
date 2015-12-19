"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 9001;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/modules/passport')(app);

app.set("views", './src/views');
app.set("view engine", 'ejs');

var menuItems = [{link: "/books", text: "Books"}, {link: "/authors", text: "Authors"}];

var BookRouter = require("./src/routes/bookRoutes");
var AdminRouter = require("./src/routes/adminRoutes");
var AuthRouter = require("./src/routes/authRoutes");

app.use("/books", BookRouter({menuItems: menuItems}));
app.use("/admin", AdminRouter({menuItems: menuItems}));
app.use("/auth", AuthRouter());

app.get("/", function (req, res) {
    res.render("home", {title: "Hello from render", menuItems: menuItems});
});

app.listen(port, function (err) {
    console.log("Running server on port " + port);
});





