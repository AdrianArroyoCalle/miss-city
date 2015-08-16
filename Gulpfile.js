var gulp=require("gulp");
var uglify=require("gulp-uglify");
var rimraf=require("rimraf");
var imagemin=require("gulp-imagemin");
var minifyCSS=require("gulp-minify-css");
var minifyHTML=require("gulp-minify-html");
var fs=require("fs");
var EasyZip=require("easy-zip").EasyZip;
var filesize=require("filesize");

gulp.task("clean",function(cb){
  rimraf("build",cb);
});

gulp.task("javascript",function(){
  return gulp.src("src/index.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/"));
});

gulp.task("html",function(){
  return gulp.src("src/index.html")
    .pipe(minifyHTML())
    .pipe(gulp.dest("build/"));
});

gulp.task("css",function(){
  return gulp.src("src/index.css")
    .pipe(minifyCSS())
    .pipe(gulp.dest("build/"));
});

gulp.task("zip",["html","css","javascript","images"],function(cb){
  var zip=new EasyZip();
  zip.zipFolder("build/",function(){
    zip.writeToFile("miss-city.zip",cb);
  },{rootFolder: "/"});
});

gulp.task("check-size",["zip"],function(cb){
  var stats=fs.statSync("miss-city.zip");
  var size=stats["size"];
  console.log("ZIP size is: "+filesize(size));
  if(filesize(size,{output: "array"})[0] > 13){
    console.log("Size is over 13kb. Please clean!!");
  }
  cb();
});

gulp.task("images",function(){
  return gulp.src("res/*.gif")
    .pipe(imagemin())
    .pipe(gulp.dest("build/"));
});

gulp.task("default",["check-size"]);
