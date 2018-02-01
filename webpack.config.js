'use strict';

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        "uglydate": path.resolve("./src/main.js"),
        "uglydate.min": path.resolve("./src/main.js")
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./dist/'),
        library: 'UglyDate',
        libraryTarget: 'window'
    },

    externals: {
        dateformat: {
            commonjs: 'dateformat',
            commonjs2: 'dateformat',
            amd: 'dateformat',
            root: 'dateformat'
        }
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/.*/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        // uncompressed version 
        new UglifyJsPlugin({
            include: /\!(.min)\.js$/,
            sourceMap: true,
            uglifyOptions: {
                minimize: false,
                compress: false
            }
        }),

        // compressed version
        new UglifyJsPlugin({
            include: /\.min\.js$/,
            sourceMap: false,
            uglifyOptions: {
                minimize: true
            }
        })
    ]
};