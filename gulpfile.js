var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");

function styles() {
    return gulp.src([ "./src/css/*.sass", "!./src/css/_*.sass" ])
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./static/css/"));
}

var scripts = gulp.parallel(userScripts, libScripts);

function libScripts() {
    return gulp.src([ "./src/js/lib/**/*.js" ])
        .pipe(gulp.dest("./static/js/lib/"));
}

function userScripts() {
    return gulp.src([ "./src/js/**/*.js", "!./src/js/lib/**/*.js" ])
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("./static/js/"));
}

function images() {
    return gulp.src("./src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./static/img/"));
}

var build = gulp.parallel(styles, scripts, images);

function watch() {
    gulp.watch("./src/css/**/*", styles);
    gulp.watch("./src/js/**/*", scripts);
    gulp.watch("./src/img/**/*", images);
}

exports.default = gulp.parallel(build, watch);
exports.build = build;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
