﻿"use strict";
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
    if (env.NODE_ENV == undefined) env.NODE_ENV = 'development';

    let config = {
        mode: env.NODE_ENV,
        context: path.resolve(__dirname),
        cache: true,
        entry: {
            SystemCenter: "./wwwroot/Scripts/TSX/SystemCenter/SystemCenter.tsx",
        },

        output: {
            path: path.resolve(__dirname, 'wwwroot', 'Scripts'),
            publicPath: 'Scripts/',
            filename: "[name].js"
            //chunkFilename: '[name].bundle.js'
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: "inline-source-map",
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"],
            alias: {
                leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css"
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, 'wwwroot', "Content"),
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: true } }],
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, 'wwwroot'),
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader'}],
                },
                {
                    test: /leaflet\.css$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader',
                    options: { limit: 100000 }
                }
            ]
        },
        externals: {
            ace: 'ace',
            d3: 'd3',
        },
        optimization: {
            minimizer: [
                new TerserPlugin({ extractComments: false })
            ],
        },
        plugins: [
            new NodePolyfillPlugin(),
        ]
    };

    if (env.NODE_ENV == 'development') {
        config.module.rules.push({
            test: /\.tsx?$/,
            include: [path.resolve(__dirname, 'wwwroot', "Scripts"), path.resolve(__dirname, 'EventWidgets', "TSX")],
            loader: "ts-loader", options: { transpileOnly: true }
        });

        config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    else if (env.NODE_ENV == 'none') {
        config.module.rules.push({
            test: /\.tsx?$/,
            include: [path.resolve(__dirname, 'wwwroot', "Scripts"), path.resolve(__dirname, 'EventWidgets', "TSX")],
            loader: "ts-loader", options: { transpileOnly: true }
        });
    }
    else {
        config.module.rules.push({
            test: /\.tsx?$/,
            include: [path.resolve(__dirname, 'wwwroot', "Scripts"), path.resolve(__dirname, 'EventWidgets', "TSX")],
            loader: "ts-loader"
        });
    }

    return config;
};