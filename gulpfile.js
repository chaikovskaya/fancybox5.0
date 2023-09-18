const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
//compile scss into css
function style() {
    return gulp.src('scss/common.scss')
        .pipe(concat('common.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "/contacts.html"
        }
    });
    gulp.watch('scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);

}
exports.style = style;
exports.watch = watch;

let def = gulp.series(style, watch);
gulp.task('default', def);