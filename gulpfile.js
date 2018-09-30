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
  masterImg: "master-templates/img"
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
      .pipe(gulp.dest("."))
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
    .pipe(gulp.dest("js"));
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
    .pipe(gulp.dest("css"));
});

gulp.task("images", () =>
  gulp
    .src(paths.masterImg + "/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("img"))
);

gulp.task("watch", () => {
  gulp.watch("./pages", ["nunjucks", "scripts", "styles", "images"]);
});

gulp.task("default", ["nunjucks", "scripts", "styles", "images", "watch"]);
