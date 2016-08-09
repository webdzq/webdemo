var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");//编译react有问题
//var reactify = require('reactify');
var source = require("vinyl-source-stream");
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
var less = require('gulp-less'),

    concat = require('gulp-concat');
var rev = require('gulp-rev');
//- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');
var fileinclude  = require('gulp-file-include');
//var react = require('gulp-react');
var del = require('del');
// 静态服务器
gulp.task('browser', function () {

    browserSync.init({
        port: 8009,
        server: {
            baseDir: "./dist/",
            index: "index.html"

        }
    });
});
gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist']);
});
gulp.task('watch', function () {
    gulp.watch(['src/**/*.html'], ['html']);
    gulp.watch(['src/**/*.less'], ['less']);
    gulp.watch("src/**/*.js", ['browserify']);
});

gulp.task('less-update',['less','rev'], function () {
    //gulp.run('less','rev');
});
gulp.task('less', function () {
    gulp.src('./src/**.less')
        .pipe(less({compress: true}))
        .on('error', function (e) {
            console.log(e);
        })
        .pipe(concat('app.css')) // 合并文件为all.css
        //.pipe(rev())
        .pipe(gulp.dest('dist/'))
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('./rev'));

        .pipe(reload({stream: true}));
});
//gulp.task('rev', function() {
//    gulp.src(['./rev/*.json', './index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
//        .pipe(revCollector())                    //- 执行文件内css名的替换
//        .pipe(gulp.dest('dist/'))               //- 替换后的文件输出的目录
//        .pipe(reload({stream: true}));
//});

gulp.task('html', function () {
    gulp.src('./**.html')

        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});
gulp.task('browserify', function () {
    var b = browserify({
        entries: "./src/app.js",
        //transform: [reactify],
        debug: true
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));//输出
});

gulp.task('default', ['clean'], function () {
    gulp.run( 'less','html', 'browserify', 'browser', 'watch');
});