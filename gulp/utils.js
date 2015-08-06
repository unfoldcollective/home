/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 21/01/2015
 * Time: 12:19
 */

var minimist = require('minimist'),
    browserSync = require('browser-sync'),
    through = require('through2');

var isServerRunning = false;

module.exports = {
    noop:function(  ){
        //see https://github.com/gulpjs/gulp-util/blob/master/lib/noop.js
        // added here so we dont have to get gulp utils ourselves
        return through.obj();
    },
    setIsServerRunning: function (bool) {
        isServerRunning = bool;
    },
    getIServerRunning: function () {
        return isServerRunning;
    },
    /*
    * conditional reload
    * */
    reload:function(  ){
        if (isServerRunning) {
            return browserSync.reload({stream: true});
        }
        return this.noop();
    },
    getEnvironmentConfig: function () {
        var options = minimist(process.argv),
            expressPort = options.port || 8000,
            environment = options.env || "development",
            appName = options.appname || "app";

        return {
            expressPort: expressPort,
            environment: environment,
            appName:appName,
            data: require(process.cwd() + '/config/' + environment + '.json')
        }
    },

    /*
     * helper for error handling
     * */
    handleError: function (err) {
        console.log(err.toString());
        this.emit('end');
    }


}