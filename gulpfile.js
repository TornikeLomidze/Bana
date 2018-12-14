var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
var mode = process.env.NODE_ENV || 'DEVELOPMENT';
var buildProd = ['concat-prod-js', 'concat-prod-css'];
var build = ['concat-js', 'concat-css', 'watch', 'nodemon'];

var jsFilesArray = [
	'assets/bower_components/jquery/dist/jquery.min.js',
	'assets/bower_components/angular/angular.min.js',
	'assets/bower_components/angular-route/angular-route.min.js',
	'assets/bower_components/angular-cookies/angular-cookies.min.js',
	'assets/bower_components/gsap/src/minified/TweenMax.min.js',
	'assets/bower_components/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
	'assets/bower_components/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
	'assets/bower_components/jquery-knob/dist/jquery.knob.min.js',
	'assets/bower_components/vivus/dist/vivus.min.js',
	'assets/bower_components/angular-image-compress/angular-image-compress.js',
	'assets/bower_components/bootstrap/dist/js/bootstrap.min.js',
	'assets/bower_components/scrollreveal/dist/scrollreveal.min.js',
	'assets/bower_components/jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js',
	'assets/bower_components/three.js/three.min.js',
	'app/*.js',
	'assets/js/*.js'
];

var cssFilesArray = [
	'assets/stylesheets/*.css',
	'assets/bower_components/animate.css/animate.min.css'
];

// JS
gulp.task('concat-js', () => {
    return gulp.src(jsFilesArray)
        .pipe(concat('client.min.js'))
        .pipe(gulp.dest('assets/build/'));
});

gulp.task('concat-prod-js', () => {
    return gulp.src(jsFilesArray)
        .pipe(concat('client.min.js'))
        .pipe(gulp.dest('assets/build/'))
        .pipe(uglify({mangle: false}))
        .pipe(rename('client.min.js'))
        .pipe(gulp.dest('assets/build/'));
});

// CSS
gulp.task('concat-css', () => {
	return gulp.src(cssFilesArray)
		.pipe(concatCss("client.min.css"))
		.pipe(gulp.dest('assets/build/'));
});

gulp.task('concat-prod-css', () => {
	return gulp.src(cssFilesArray)
		.pipe(concatCss("client.min.css"))
		.pipe(gulp.dest('assets/build/'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('assets/build/'));
});

// Watcher
gulp.task('watch', () => {
    gulp.watch('app/**', ['concat-js']);
    gulp.watch('assets/js/**', ['concat-js']);
    gulp.watch('assets/stylesheets/**', ['concat-css']);
});

// Nodemon
gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js',
        ext: 'html js'
    });
});

// Tasks
// Decelopment
gulp.task('default', build, () => {
    // Run Gulp, Run...
});

// Production
gulp.task('prod', buildProd, () => {
    // Run Gulp, Run...
});
