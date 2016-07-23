var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");//编译react有问题
//var reactify = require('reactify');
var source = require("vinyl-source-stream");
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
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
    gulp.watch(['./*.html'], ['html']);
    // gulp.watch(['./*.less'], ['revcss']);
    gulp.watch("src/**/**/*.jsx", ['browserify']);
});
gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});
gulp.task('browserify', function () {
    var b = browserify({
        entries: "./src/js/app.js",
        //transform: [reactify],
        debug: true
    });

    return b.bundle()

        .pipe(source("bundle.js"))

        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));//输出
});

gulp.task('default', ['clean'], function () {
    gulp.run('html', 'browserify', 'browser', 'watch');
});