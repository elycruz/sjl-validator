/**
 * Created by edelacruz on 4/14/14.
 */
var packageJson = require('./package'),
    gulpConfig = require('./gulpconfig'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    eslint = require('gulp-eslint'),
    jsdoc = require('gulp-jsdoc3'),
    duration = require('gulp-duration'),
    lazypipe = require('lazypipe'),
    chalk = require('chalk'),
    crypto = require('crypto'),
    fs = require('fs'),
    util = require('util'),
    eslintPipe = lazypipe()
        .pipe(eslint)
        .pipe(duration, chalk.cyan("eslint duration"))
        .pipe(eslint.reporter, 'eslint-stylish');

gulp.task('readme', function () {
    gulp.src(gulpConfig.readme)
        .pipe(concat('README.md'))
        .pipe(gulp.dest('./'));
});

gulp.task('tests', function () {
    gulp.src([
        'tests/*.js'
    ])
        .pipe(mocha());
});

gulp.task('make-browser-test-suite', function () {
    return gulp.src([
        'tests/for-browser/tests-header.js',
        'tests/for-server/**/*.js'])
        .pipe(eslintPipe())
        .pipe(replace(/\/\/ ~~~ STRIP ~~~[^~]+\/\/ ~~~ \/STRIP ~~~[\n\r\f]+/gim, ''))
        .pipe(concat('tests/for-browser/test-suite.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('eslint', function () {
    return gulp.src([
        'src/**/*.js',
        'tests/*.js'
        ])
        .pipe(eslint());
});

gulp.task('jsdoc', function (cb) {
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc({
            opts: {
                "template": "templates/default",  // same as -t templates/default
                "encoding": "utf8",               // same as -e utf8
                "destination": "./jsdocs/",          // same as -d ./out/
                "recurse": true
            }
        }, cb));
});

gulp.task('watch', function () {

    // Watch all javascript files
    gulp.watch(['./tests/*', './src/**/*', './node_modules/**/*'], [
        'eslint',
        //'jsdoc',
        // 'make-browser-test-suite'
    ]);

    // Watch readme-sections for 'jsdoc' task
    // gulp.watch(['README.md'], ['jsdoc']);

    // Watch changelog-fragments and markdown-fragments-fragments for 'readme-sections' task
    gulp.watch(['markdown-fragments-fragments/*.md'], ['readme']);

});

gulp.task('build', [
    'readme',
    'jsdoc',
    'tests',
    // 'make-browser-test-suite'
]);

gulp.task('default', [
    'build',
    'watch'
]);
