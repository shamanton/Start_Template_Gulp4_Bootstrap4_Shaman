var gulp                = require('gulp'),
    sass                = require('gulp-sass'),
    browserSync         = require('browser-sync'),
    autoprefixer        = require('gulp-autoprefixer'),
    cssnano             = require('gulp-cssnano'),
    rename              = require('gulp-rename'),
    uglify              = require('gulp-uglify'),
    pump                = require('pump');


// ----------------------------------------------------------------------------------

    gulp.task('js', function (cb) {
    pump([
    gulp.src(['app/js/common.js', '!js/*.min.js']),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest('app/js/')], cb
    );
});

// ----------------------------------------------------------------------------------

    gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

// ----------------------------------------------------------------------------------

    gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

// ----------------------------------------------------------------------------------

    gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

    gulp.task('watch', function() {
            gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
            gulp.watch('app/*.html', gulp.parallel('code'));
            gulp.watch(['app/js/common.js'], gulp.parallel('js'));
        });
    gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));