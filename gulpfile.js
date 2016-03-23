var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var config = {
	browsersync: {
		watch: [
			'./*',
			'./js/*.js',
			'./js/controllers/*.js',
			'./js/controllers/*/*.js',
			'./js/directives/*.js',
			'./js/directives/*/*.js',
			'./js/filters/*.js',
			'./js/directives/*/*.js',
			'./css/*.css',
			'./templates/*.html',
			'./templates/admin/*.html',
			'./templates/content/*.html',
			'./templates/directives/*.html',
			'./templates/directives/*/*.html'
		]
	}
}

// Static server
gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	
	gulp.watch(config.browsersync.watch).on('change', browserSync.reload);
});
