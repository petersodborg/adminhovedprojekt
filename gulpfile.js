/**
 * Created by petersodborgchristensen on 25/04/2016.
 */
var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./public/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("public/dist"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["public/index.html","app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"])
        .pipe(gulp.dest("public/dist"));
});

gulp.task("default",["copy"],function(){
    console.log("Gulp completed...");
});