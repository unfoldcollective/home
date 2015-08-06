
var gulp = require('gulp'),
    requireDir = require('require-dir');

//load gulp tasks from gulp directory
requireDir('./gulp')
requireDir('./gulp/generators')
requireDir('./gulp/tasks')
requireDir('./gulp/workflows')

/*
 *
 *
 *
 *
 *
 *
 *
 * workflows
 * */

gulp.task('build', ['html', 'scripts', 'less', 'images', 'data']);
gulp.task('build-react', ['html', 'scripts-react', 'less', 'images', 'data']);
gulp.task('build-angular', ['html', 'scripts','ng-copy-templates' ,'partials','less', 'images', 'data']);
gulp.task('build-elm', ['html', 'scripts','elm-init','elm','ng-copy-templates' ,'less', 'images', 'data']);

/*
 * default
 * */

gulp.task('default-no-browser-sync', ['build', 'watch', 'server']);
gulp.task('default', ['build-react', 'watch', 'server-with-browser-sync']);

gulp.task('default-react-no-browser-sync', ['build-react', 'watch-react', 'server']);
gulp.task('default-react', ['build-react', 'watch-react', 'server-with-browser-sync']);

gulp.task('default-angular', ['build-angular', 'watch-angular', 'server-with-browser-sync']);
gulp.task('default-angular-no-browser-sync', ['build-angular', 'watch-angular', 'server']);

gulp.task('default-elm', ['build-elm', 'watch-elm', 'server-with-browser-sync']);
gulp.task('default-elm-no-browser-sync', ['build-elm', 'watch-elm', 'server']);

//gulp.task('default-react',['build-react','watch-react','server-with-browser-sync'])
//gulp.task('default-react-no-browser-sync',['build-react','watch-react','server'])
