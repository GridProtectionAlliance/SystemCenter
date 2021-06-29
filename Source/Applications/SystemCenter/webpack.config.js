"use strict";
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
    if (env.NODE_ENV == undefined) env.NODE_ENV = 'development';


    return {
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
            }
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, 'wwwroot', "Scripts"),
                    loader: "ts-loader", options: { transpileOnly: true }
                },
                //{
                //    test: /\.tsx?$/,
                //    include: path.resolve(__dirname, 'wwwroot', "Scripts"),
                //    loader: "esbuild-loader", options: {
                //        loader: 'tsx', target: 'es2015', tsconfigRaw: require('./tsconfig.json')
                //    }
                //},

                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, 'wwwroot', "Content"),
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                },
            ]
        },
        externals: {
            ace: 'ace',
            d3: 'd3',
        },
        optimization: {
            minimizer: [
                new TerserPlugin({extractComments: false})
            ],
        },
        plugins: [
            new NodePolyfillPlugin(),
            new ForkTsCheckerWebpackPlugin()
        ]
    }
};