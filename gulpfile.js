const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");

const paths = {
  nodePath: "node_modules",
  masterCss: "master-templates/css",
  masterJs: "master-templates/js",
  masterImg: "master-templates/img",
  masterFont: "master-templates/fonts"
};

gulp.task("nunjucks", function() {
  // Gets .html and .nunjucks files in pages
  return (
    gulp
      .src("pages/**/*.+(html|nunjucks)")
      // Renders template with nunjucks
      .pipe(
        nunjucksRender({
          path: ["layouts/"]
        })
      )
      // output files in app folder
      .pipe(gulp.dest("dist"))
  );
});

gulp.task("scripts", () => {
  return gulp
    .src([
      paths.masterJs + "/jquery.min.js",
      paths.masterJs + "/bootstrap.min.js",
      paths.masterJs + "/owl.carousel.min.js",
      paths.masterJs + "/jquery.magnific-popup.js",
      paths.masterJs + "/main.js"
    ])
    .pipe(uglify().on("error", err => console.log("scripts error", err)))
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("dist/js"));
  // .pipe(rename({ suffix: ".min" }))
  // .pipe(gulp.dest("js"));
});

gulp.task("styles", () => {
  return gulp
    .src([paths.masterCss + "/*.css"])
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("images", () =>
  gulp
    .src(paths.masterImg + "/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
);

gulp.task("fonts", () =>
  gulp
    .src(paths.masterFont + "/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/fonts"))
);

gulp.task(
  "default",
  gulp.parallel("nunjucks", "scripts", "styles", "images", "fonts")
);
