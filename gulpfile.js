"use strict";

var gulp = require('gulp');
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var nodemon = require("gulp-nodemon");

var jsFiles = ["*.js", "src/**/*.js"];

gulp.task("style", function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jscs());
});

var htmlDir = "./src/views";
var htmlFiles = htmlDir + "/*.html";
var jadeFiles = htmlDir + "/*.jade";
var viewFiles = [htmlFiles, jadeFiles];

gulp.task("inject", function () {
    var wiredep = require("wiredep").stream;
    var inject = require("gulp-inject");

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: "../../public"
    };

    var injectSrc = gulp.src(["./public/css/*.css", "./public/js/*.js"], {read: false});
    var injectOptions = {
        ignorePath: 'public'
    };

    return gulp.src(viewFiles)
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest(htmlDir));
});

gulp.task("serve", ["style", "inject"], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            "PORT": 9001
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on("restart", function (ev) {
            console.log("Restarting....");
        });
});

