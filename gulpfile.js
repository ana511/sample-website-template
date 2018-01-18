const gulp = require('gulp');
const less = require('gulp-less');
// const useref = require('useref');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('css', function(){
	return gulp.src('assets/less/*.less')
	.pipe(less())
	.pipe(autoprefixer({browsers: ['last 2 versions'], cascade : false}))
	.pipe(minifyCSS())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream : true
	}));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server : {
			baseDir : './'
		}
	});
});

gulp.task('watch', ['browserSync', 'css'], function(){
	gulp.watch('assets/less/*.less', ['css']);
	gulp.watch('./*.html', browserSync.reload);
	//add other watchers here
});

gulp.task('default', ['css']);