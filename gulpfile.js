const gulp= require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const sourcemaps  = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')
const del = require('del');
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin');

function cssTask(done) {
	gulp.src("./blocks/**/*.css")
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(cssnano())
      .pipe(concat('styles.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(
        rename(function(path) {
        if(!path.extname.endsWith('.map')) {
          path.basename += '.min';
        }
      }))
      .pipe(gulp.dest("./dist"));
	done();
}

function htmlTask(done) {
  gulp.src('./index.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
      }))
      .pipe(gulp.dest('./dist/'))
      done()
}

function imgTask(done) {
  gulp.src('./images/**/*.+(png|jpg|svg|webp)').pipe(imagemin()).pipe(gulp.dest('./dist/images/'))
  done()
}

function cleanDist(done) {
  del(["./dist/**/*"])
  done()
}

exports.cssTask = cssTask;

exports.build = gulp.series(cleanDist, cssTask, htmlTask, imgTask)