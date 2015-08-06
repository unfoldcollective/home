/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 16/01/2015
 * Time: 17:36
 */

var gulp = require('gulp'),
    merge = require('merge-stream'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    plugins = require('gulp-load-plugins')(),
    inquirer = require('inquirer'),
    capitalize = require("underscore.string/capitalize"),

    utils =  require('../utils');


gulp.task('gen', function (done) {
    var graph = {
        nodes: [
            {
                id: 'id_root',
                labels: ['question'],
                properties: {
                    name: 'genType',
                    message: 'I wanna create a ...'
                }
            },
            /*
            *
            * d3.js plain
            * */
            {
                id: 'id_d3',
                labels: ['question'],
                properties: {
                    value: 'd3',
                    name: 'genComponentType',
                    message: 'I wanna create a ...'
                }
            },
             /*

             * Angular
             * */
            {
                id: 'id_angular',
                labels: ['question'],
                properties: {
                    value: 'angular',
                    name: 'genComponentType',
                    message: 'I wanna create a ...'
                }
            },
            {
                id: 'id_app',
                labels: ['question'],
                properties: {
                    value: 'application',
                    name: 'name',
                    message: 'component of type...'
                }
            },
            {
                id: 'id_service',
                labels: ['question'],
                properties: {
                    value: 'service',
                    name: 'name',
                    message: 'component of type...'
                }
            },
            {
                id: 'id_directive',
                labels: ['question'],
                properties: {
                    value: 'directive',
                    name: 'name',
                    message: 'component of type...'
                }
            },
            {
                id: 'id_name',
                labels: ['question'],
                properties: {
                    name: 'name',
                    message: 'with name...'
                }
            },
            /*

             * Vanilla
             * */
            {
                id: 'id_vanilla',
                labels: ['question'],
                properties: {
                    value: 'vanilla',
                    name: 'appName',
                    message: 'I wanna create a...'
                }
            }
        ],
        relationships: [
            /*
             * angulsr
             * */
            {
                id: 'idr1',
                to: 'id_angular',
                from: 'id_root',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr2',
                to: 'id_app',
                from: 'id_angular',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr3',
                to: 'id_directive',
                from: 'id_angular',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr4',
                to: 'id_service',
                from: 'id_angular',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr5',
                to: 'id_name',
                from: 'id_app',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr6',
                to: 'id_name',
                from: 'id_service',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr7',
                to: 'id_name',
                from: 'id_directive',
                type: 'HAS_OPTION',
                properties: {}
            },
            /*
             * vanilla
             * */
            {
                id: 'idr2',
                to: 'id_vanilla',
                from: 'id_root',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr9',
                to: 'id_name',
                from: 'id_vanilla',
                type: 'HAS_OPTION',
                properties: {}
            },
            /*
            * d3
            * */

            {
                id: 'idr10',
                to: 'id_d3',
                from: 'id_root',
                type: 'HAS_OPTION',
                properties: {}
            },
            {
                id: 'idr11',
                to: 'id_name',
                from: 'id_d3',
                type: 'HAS_OPTION',
                properties: {}
            }
        ]
    };

    var answersDict = {};

    function generate(answersDict) {
          console.log( '::generate() ' , answersDict );

        var appName =  utils.getEnvironmentConfig().appName;


        var fileRejectionList = ['package.json'];

        var dir = answersDict.genComponentType;

        answersDict.name = answersDict.name + capitalize(answersDict.genComponentType);

        var files = fs.readdirSync(path.join(__dirname, answersDict.genType, dir));

        files = _.map(files, function (f) {
            return path.join(__dirname, answersDict.genType, dir, f)
        });

        /*
         * do the processing
         * */

        gulp.src(files)
            .pipe(plugins.rename(function (path) {
                if (_.contains(fileRejectionList, path.basename + path.extname)) {
                    return path;
                }
                else if (path.basename.indexOf('spec') !== -1) {
                    path.basename = answersDict.name + '.spec';
                } else {
                    path.basename = answersDict.name;
                }
            }))
            .pipe(plugins.template(answersDict))
            .pipe(gulp.dest( appName + '/scripts/' + dir + '/' + answersDict.name))
            .on('end', function () {

            });

    }

    function ask(question) {

        var nextOptions = _.filter(graph.relationships, function (r) {
            return r.type === 'HAS_OPTION' && r.from === question.id;
        })

        //console.log( 'we have ' , nextOptions.length , ' posible answers thus it is a ' , nextOptions.length === 1 ? 'question'  : 'list' );
        //
        if (!nextOptions.length) {
            return;
        }

        var scopeNodes;
        var q = {};
        scopeNodes = _.map(nextOptions, function (r) {
            return _.find(graph.nodes, function (n) {
                return n.id === r.to
            });
        })
        if (nextOptions.length > 1) {
            q.type = 'list';
            q.name = question.properties.name;
            q.message = scopeNodes[0].properties.message;

            q.choices = _.map(scopeNodes, function (n) {
                return n.properties.value;
            })

        } else {
            q.type = 'input';
            q.name = question.properties.name;
            //q.message = question.properties.message;
            q.message = scopeNodes[0].properties.message;
        }

        inquirer.prompt(q,
            function (answers) {
                //console.log( 'answers = ' , answers , ' from ', scopeNodes);

                _.extend(answersDict, answers);

                var answerNode = _.find(scopeNodes, function (n) {
                    return n.properties.value === _.values(answers)[0];
                });

                if (answerNode) {
                    ask(answerNode)
                }
                else {
                    generate(answersDict);
                }
            })
    }

    var initialNode = _.find(graph.nodes, function (n) {
        return n.id === 'id_root';
    });

    ask(initialNode);
})
