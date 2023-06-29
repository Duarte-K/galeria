import pkg from "gulp";
const { src, dest, parallel, task, watch } = pkg;

import rename from "gulp-rename";
import GulpUglify from "gulp-uglify";
import gulpUglifycss from "gulp-uglifycss";
import GulpImage from "gulp-image";
import babel from "gulp-babel";
import cssImport from "gulp-cssimport";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// Exporta o HTML
const base = () => src("./src/*.html").pipe(dest("./public/"));

// Otimiza, Traduz para navegadores mais antigos, renomeia e exporta o JavaScript
const sw = () =>
    src("./src/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(GulpUglify())
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(dest("./public/"));

// Otimiza, Traduz para navegadores mais antigos, renomeia e exporta o JavaScript
const js = () =>
    src("./src/js/**/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(GulpUglify())
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(dest("./public/js/"));

// Traduz o Sass para CSS, otimiza, renomeia e exportar o CSS
const scss = () =>
    src("./src/sass/*.sass")
        .pipe(cssImport())
        .pipe(sass())
        .pipe(gulpUglifycss())
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(dest("./public/css/"));

// Executa o gulp em tempo real
task('watch', () => {
    watch("src/*.html", base);
    watch("src/*.js", sw);
    watch("src/js/**/*.js", js);
    watch("src/sass/*.sass", scss);
})

// Executa os métodos configurados do gulp
export default parallel(base, sw, js, scss);
