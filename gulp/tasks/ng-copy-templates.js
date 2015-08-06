/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 30/01/2015
 * Time: 13:16
 */

var gulp = require('gulp'),
    utils = require('../utils');

gulp.task('ng-copy-templates',function(  ){

    var appName =  utils.getEnvironmentConfig().appName;

    return gulp
        .src( './'+ appName + '/scripts/directive/**/*.html')
        .pipe(gulp.dest('dist/' + appName + '/partials'))
        .pipe(utils.reload());

})