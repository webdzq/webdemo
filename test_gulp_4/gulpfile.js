//实现了自动刷新页面。未实现，自动open浏览器窗口
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


/**
livereload是个坑，有问题。
var gulp = require('gulp');

var livereload = require('gulp-livereload');
gulp.task('watch', function () {
	 livereload.listen(); //要在这里调用listen()方法
  gulp.watch(['./*.html'], ['html']);
});



gulp.task('html', function () {
  gulp.src('./*.html')
		.pipe(livereload());;
});

//运行Gulp时，默认的Task
gulp.task('default', [ 'watch']);
**/





//实现了自动打开窗口和自动刷新
//遗留问题:watchify安装不成功，无法替代browserify。2、md5 使用有问题。
var gulp        = require('gulp');
var browserSync = require('browser-sync').create(),
reload = browserSync.reload,
browserify = require("browserify"),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
less = require('gulp-less'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),

concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换
//var path = require("path");
// 静态服务器
gulp.task('browser-sync', function() {
   
		browserSync.init({
        port: 8089,
			server: {
				baseDir: "./dist/",
				index: "index.html"
				
			}
    });
});
gulp.task('build-less', function(){
  gulp.src('./*.less')
    .pipe(less({ compress: true }))
    .on('error', function(e){console.log(e);} )
    .pipe(gulp.dest('./dist/css/'));

});

// 合并、压缩、重命名css
gulp.task('css',['build-less'], function() {
  gulp.src(['./dist/css/*.css'])
    .pipe(concat('all.css')) // 合并文件为all.css
	
    .pipe(gulp.dest('./dist/css/')) // 输出all.css文件
    .pipe(rename({ suffix: '.min' })) // 重命名all.css为 all.min.css
    .pipe(minifycss()) // 压缩css文件
	.pipe(rev())  //- 文件名加MD5后缀
    .pipe(gulp.dest('./dist/css/')) // 输出all.min.css
	
	.pipe(rev.manifest())                           //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./dist/')) ;              //- 将 rev-manifest.json 保存到 dist 目录内
});
gulp.task('revcss',['css'],function() {
    gulp.src(['./dist/*.json', './index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./dist/'))                    //- 替换后的文件输出的目录
		.pipe(reload({stream:true}));
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
        .pipe(gulp.dest('dist/js'))
		.pipe(reload({stream:true}));//输出
});

gulp.task('watch', function () {
	gulp.watch(['./*.html'], ['html']);
	gulp.watch(['./*.less'], ['revcss']);
	gulp.watch("src/*.js", ['js-watch']);
});

gulp.task('js-watch', ['js','browserify']);
gulp.task('clean', function() {  
	  return gulp.src([ './dist/'], {read: false})
		.pipe(clean({force: true}));
	});
//gulp.task('default', ["browser-sync","watch"]);

gulp.task('default', ['clean'], function() {  
		gulp.run('html','revcss', 'js','browserify','browser-sync','watch');
	});
	
	




/**
var watchify = require('watchify');  
var browserify = require('browserify');  
var gulp = require('gulp');  
var source = require('vinyl-source-stream');  
var buffer = require('vinyl-buffer');  
var gutil = require('gulp-util');  
var uglify = require('gulp-uglify');

// add custom browserify options here
var b = watchify(browserify(assign({}, watchify.args, {  
  cache: {}, // required for watchify
  packageCache: {}, // required for watchify
  entries: ['./src/index.js']
}))); 

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('browserify', bundle);  
b.on('update', bundle); // on any dep update, runs the bundler  
b.on('log', gutil.log); // output build logs to terminal

function bundle() {  
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
}
**/