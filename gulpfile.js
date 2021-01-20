var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var ghPages = require('gh-pages');

gulp.task('css', function () {
    return gulp.src('style.css')
        .pipe(
            cleanCss({
                compatibility: 'ie8'

            })
        )

        .pipe(gulp.dest('dist'))

});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'))


});

gulp.task('fonts', function () {
    return gulp.src('fonts/* ')
        .pipe(gulp.dest('dist/fonts'))


});

gulp.task('img', function () {
    return gulp.src('img/* ')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))


});

gulp.task('js', function () {
    return gulp.src('*.js')
        .pipe(gulp.dest('dist'))


});



gulp.task('watch', function () {

    browserSync.init({
        server: {

            baseDir: 'dist'
        }

    })

    gulp.watch('*.html', gulp.series('html')).on("change", browserSync.reload);
    gulp.watch('style.css', gulp.series('css')).on("change", browserSync.reload);
    gulp.watch('fonts/*', gulp.series('fonts')).on("change", browserSync.reload);
    gulp.watch('img/*', gulp.series('img')).on("change", browserSync.reload);
    gulp.watch('*.js', gulp.series('js')).on("change", browserSync.reload);

});

gulp.task('deploy', async function(){

    ghPages.publish("dist")
})


gulp.task('default', gulp.series('html', 'css','fonts','js', 'img', 'watch'));