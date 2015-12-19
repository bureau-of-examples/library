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

var BookRouter = require("./src/routes/bookRoutes");
var AdminRouter = require("./src/routes/adminRoutes");
var AuthRouter = require("./src/routes/authRoutes");

app.use("/books", BookRouter());
app.use("/admin", AdminRouter());
app.use("/auth", AuthRouter());

var createViewModel = require('./src/modules/createViewModel');

app.get("/", function (req, res) {
    var model = createViewModel();
    model.title = "Hello from render";
    res.render("home", model);
});

app.listen(port, function (err) {
    console.log("Running server on port " + port);
});





