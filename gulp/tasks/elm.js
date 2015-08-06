/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 11/02/2015
 * Time: 11:24
 */

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    utils = require('../utils');


gulp.task('elm-init', plugins.elm.init);

gulp.task('elm',function(  ){
    var appName =  utils.getEnvironmentConfig().appName;

    return gulp.src(  './' + appName  + '/elm/**/*.elm')
        .pipe(plugins.elm())
        .on('error', utils.handleError)
        .pipe(gulp.dest('dist/'+ appName +'/scripts'))
        .pipe(utils.reload());
});