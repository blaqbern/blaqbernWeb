"use-strict";

var gulp = require("gulp");
var gulpgo = require("gulp-gaegoapp");
var gutil = require("gulp-util");
var plugins = require("gulp-load-plugins")();

var go;
function out(prefix) {
  prefix = (prefix || "");
  return function(data) {
      console.log(prefix, data.toString());
  };
}

gulp.task("goserve", ["watch"], function() {
      go = gulpgo.run("serve", ["github.com/blaqbern/appengine/blaqbernWeb"], {
          cwd:       __dirname,
          onStdout:  out()
      });
});

gulp.task("build-css", function() {
  return gulp.src("source/less/*.less")
    .pipe(plugins.less())
    .pipe(gulp.dest("static/css"))
    .pipe(plugins.livereload());
});

gulp.task("watch", function() {
  plugins.livereload.listen();
  gulp.watch("source/less/*.less", ["build-css"]);
  return gutil.log("Watching files in 'source/less'...");
});

gulp.task("default", ["goserve", "build-css"], function() {
  return gutil.log("Gulp is running...");
});
