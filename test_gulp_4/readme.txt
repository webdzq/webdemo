1、使用gulp、connect实现了修改html后，页面的自动刷新功能

/**
//引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    root: './',
    livereload: true,
		
		
  });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);

**/



2、使用gulp、browser-sync实现了修改html后，打开浏览器窗口，页面的自动刷新功能
//实现了自动打开窗口和自动刷新
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('html', function () {
  gulp.src('./*.html')
	.pipe(reload({stream:true}));
});
gulp.task('watch', function () {
	// gulp.run("browser-sync");
  gulp.watch(['./*.html'], ['html']);
});

gulp.task('default', ["browser-sync","watch"]);


3、在2的基础上，使用了browserify（文件流）、uglify（压缩）来处理js文件压缩和定向输出。遗留问题：1、watchify安装不成功，无法替代browserify。2、 browserify任务中，无法使用.pipe(uglify())    //压缩

//实现了自动打开窗口和自动刷新
//遗留问题:watchify安装不成功，无法替代browserify。
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var browserify = require("browserify");
var uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var path = require("path");
// 静态服务器
gulp.task('browser-sync', function() {
   
		browserSync.init({
        port: 8089,
				server: {
					baseDir: "./",
					index: "index.html"
					
				}
    });
});
gulp.task('html', function () {
  gulp.src('./*.html')
	.pipe(reload({stream:true}));
});
// 处理完JS文件后返回流  .browserify('src/*.js').bundle()

gulp.task('js', function() {
    return gulp.src('src/*.js')
		
			//.pipe(jshint('.jshintrc'))
			//.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))    //合并所有js到main.js
				
        .pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'))//输出
				//.pipe(reload({stream:true}))
				;				
});
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('watch', function () {
	// gulp.run("browser-sync");
  gulp.watch(['./*.html'], ['html']);
	//gulp.watch("src/*.js", ['js']);
	//gulp.watch("s/*.js", ['js-watch']);
});
gulp.task('clean', function() {  
	  return gulp.src([ 'dist/js'], {read: false})
		.pipe(clean());
	});
//gulp.task('default', ["browser-sync","watch"]);

gulp.task('default', ['clean'], function() {  
		gulp.start('html', 'js','browserify','browser-sync','watch');
	});
	
	
//将js文件构造成amd模式：require和module.exports.
//browserify中文件不能压缩uglify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "./dist/js/main.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("bundle.js"))
				.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名

        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
				
        .pipe(sourcemaps.write("."))
				
        .pipe(gulp.dest('dist/js'))//输出;
});




