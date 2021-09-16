'use strict'

const path = require('path')
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const components = require('../components.json')

function bundleCss() {
  return gulp
    .src(path.resolve(__dirname, '../src/styles/index.scss'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename(`index.css`))
    .pipe(gulp.dest('../lib/styles'));
}

function bundleSeperateCss() {
  const tasks = Object.keys(components).map(compName => {
    return gulp
      .src(path.resolve(__dirname, `../src/styles/${compName}.scss`))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename(`${compName}.css`))
      .pipe(gulp.dest('../lib/styles'))
  })

  return Promise.all(tasks)
}

exports.default = gulp.parallel(bundleCss, bundleSeperateCss)
