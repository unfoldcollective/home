'use strict';
var path = require('path');
var webpack = require('webpack');
var merge = require('./merge');
require('array.from');

var ROOT_PATH = path.resolve(__dirname, '..');

var common = {
    entry: [path.join(ROOT_PATH, 'app/main.js')],
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {test: [/\.less$/, /\.css$/], loader: 'style-loader!css-loader!less-loader'},
            {
                test: /\.(svg)$/,
                loader: 'raw-loader'
            }

        ]
    },
};

var mergeConfig = merge.bind(null, common);

exports.build = mergeConfig({
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.join(ROOT_PATH, 'app'),
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        })
        ,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            },
            sourceMap: false
            //,mangle:false
        })
    ],
});

exports.develop = mergeConfig({
    entry: ['webpack/hot/dev-server'],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint',
                include: path.join(ROOT_PATH, 'app'),
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(ROOT_PATH, 'app'),
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel', 'flowcheck'],
                include: [path.join(ROOT_PATH, 'app'), path.join(ROOT_PATH, 'node_modules', 'react-ace')],
            },
        ]
    },
    plugins: [
        // do not reload if there is a syntax error in your code
        new webpack.NoErrorsPlugin()

    ],
});