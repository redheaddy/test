var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	del = require('del');
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache');

gulp.task('less', function(){
	console.log('hi i am task');
	return gulp.src('app/less/**/*.less')
	.pipe(less())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}));
});
gulp.task('scripts',function(){
	return gulp.src(['app/libs/jquery/dist/jquery.min.js',
	'app/libs/magnific-popup/dist/magnific-popup.min.js'])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});
gulp.task('css-libs',function(){
	return gulp.src('app/css/libs.min.css')
	.pipe(cssnano())
	.pipe(gulp.dest('app/css'))
});
gulp.task('browser-sync',function(){
	 browserSync({
		server:{
			baseDir: 'app'
		},
	})
});
gulp.task('clean',function(){
	return del.sync('dist');
});
gulp.task('clear',function(){
	return cache.clearAll();
});
gulp.task('images',function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced:true,
		progressive:true,
		svgoPlugins:[{removeVievBox:false}],
		use:[imageminPngquant()] 
	})))
	.pipe(gulp.dest('dist/img'));
})
gulp.task('watch',['browser-sync','less','css-libs','scripts'],function(){
	gulp.watch('app/less/**/*.less',['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('build',['clean','clear','less','images','scripts'],function(){
	var buildCss = gulp.src(['app/css/*.css'])
	.pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src(['app/fonts/**/*'])
	.pipe(gulp.dest('dist/fonts'));
	var buildJs=gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
})