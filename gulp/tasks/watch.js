/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 21/01/2015
 * Time: 12:09
 */

var gulp = require('gulp'),
    utils = require('../utils');

/*
 *
 * Directory changes watching
 * */

gulp.task('watch', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    gulp.watch( appName + '/index.html', ['html']);
    gulp.watch( appName + '/less/**/*.less', ['less']);
    gulp.watch( appName + '/scripts/**/*.js', ['scripts']);
    gulp.watch( appName + '/data/**/*', ['data']);
    gulp.watch( appName + '/images/**/*{png,jpg}', ['images'])
})

gulp.task('watch-react', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    gulp.watch( appName + '/index.html', ['html']);
    gulp.watch( appName + '/less/**/*.less', ['less']);
    gulp.watch( appName + '/scripts/**/*.js', ['scripts-react']);
    gulp.watch( appName + '/data/**/*', ['data']);
    gulp.watch( appName + '/images/**/*{png,jpg}', ['images'])
})

gulp.task('watch-angular', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    gulp.watch( appName + '/index.html', ['html']);
    gulp.watch( appName + '/less/**/*.less', ['less']);
    gulp.watch( appName + '/scripts/**/*.js', ['scripts']);
    gulp.watch( appName + '/scripts/**/*.html', ['ng-copy-templates']);
    gulp.watch( appName + '/partials/**/*', ['partials']);
    gulp.watch( appName + '/data/**/*', ['data']);
    gulp.watch( appName + '/images/**/*{png,jpg}', ['images'])
})

gulp.task('watch-elm', ['elm-init'],function () {
    var appName =  utils.getEnvironmentConfig().appName;

    gulp.watch( appName + '/index.html', ['html']);
    gulp.watch( appName + '/less/**/*.less', ['less']);
    gulp.watch( appName + '/scripts/**/*.js', ['scripts']);
    gulp.watch( appName + '/scripts/**/*.html', ['ng-copy-templates']);
    gulp.watch( appName + '/data/**/*', ['data']);
    gulp.watch( appName + '/elm/**/*.elm', ['elm']);
    gulp.watch( appName + '/images/**/*{png,jpg}', ['images'])
})