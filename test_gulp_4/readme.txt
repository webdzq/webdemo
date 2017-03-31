1��ʹ��gulp��connectʵ�����޸�html��ҳ����Զ�ˢ�¹���

/**
//������
var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

//����watch����ȥ���html�ļ�,�䶨���˵�html�Ķ�֮��ȥ����һ��Gulp��Task
gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});

//ʹ��connect����һ��Web������
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

//����Gulpʱ��Ĭ�ϵ�Task
gulp.task('default', ['connect', 'watch']);

**/



2��ʹ��gulp��browser-syncʵ�����޸�html�󣬴���������ڣ�ҳ����Զ�ˢ�¹���
//ʵ�����Զ��򿪴��ں��Զ�ˢ��
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// ��̬������
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


3����2�Ļ����ϣ�ʹ����browserify���ļ�������uglify��ѹ����������js�ļ�ѹ���Ͷ���������������⣺1��watchify��װ���ɹ����޷����browserify��2�� browserify�����У��޷�ʹ��.pipe(uglify())    //ѹ��

//ʵ�����Զ��򿪴��ں��Զ�ˢ��
//��������:watchify��װ���ɹ����޷����browserify��
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
// ��̬������
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
// ������JS�ļ��󷵻���  .browserify('src/*.js').bundle()

gulp.task('js', function() {
    return gulp.src('src/*.js')
		
			//.pipe(jshint('.jshintrc'))
			//.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))    //�ϲ�����js��main.js
				
        .pipe(gulp.dest('dist/js'))    //���main.js���ļ���
        .pipe(rename({suffix: '.min'}))   //renameѹ������ļ���
        .pipe(uglify())    //ѹ��
        .pipe(gulp.dest('dist/js'))//���
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
	
	
//��js�ļ������amdģʽ��require��module.exports.
//browserify���ļ�����ѹ��uglify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "./dist/js/main.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("bundle.js"))
				.pipe(rename({suffix: '.min'}))   //renameѹ������ļ���

        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
				
        .pipe(sourcemaps.write("."))
				
        .pipe(gulp.dest('dist/js'))//���;
});




