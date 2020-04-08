"use strict";
const path = require("path");
module.exports = env => {
    if (process.env.NODE_ENV == undefined) process.env.NODE_ENV = 'development';


    return {
        mode: process.env.NODE_ENV,
        context: path.resolve(__dirname, 'wwwroot', 'Scripts'),
        cache: true,
        entry: {
            SystemCenter: "./TSX/SystemCenter/SystemCenter.tsx",
            //ByMeter: "./TSX/SystemCenter/Meter/ByMeter.tsx",
            //ByLocation: "./TSX/SystemCenter/Location/ByLocation.tsx",
            //ByAsset: "./TSX/SystemCenter/Asset/ByAsset.tsx",
            //ByUser: "./TSX/SystemCenter/User/ByUser.tsx",
            //ByCustomer: "./TSX/SystemCenter/Customer/ByCustomer.tsx",

            //Asset: "./TSX/SystemCenter/Asset/Asset.tsx",
            //NewMeterWizard: "./TSX/SystemCenter/NewMeterWizard/NewMeterWizard.tsx",
            //ConfigurationHistory: "./TSX/SystemCenter/ConfigurationHistory/ConfigurationHistory.tsx",
            //UserStatistics: "./TSX/SystemCenter/UserStatistics/UserStatistics.tsx",
            //User: "./TSX/SystemCenter/User/User.tsx",

        },

        output: {
            path: path.resolve(__dirname, 'wwwroot', 'Scripts'),
            publicPath: path.resolve(__dirname, 'wwwroot', 'Scripts'),
            filename: "[name].js",
            //chunkFilename: '[name].bundle.js'
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: "inline-source-map",
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"],
            alias: {
                ByMeter: path.resolve(__dirname, 'wwwroot', 'Scripts'),
            }
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                { test: /\.tsx?$/, loader: "ts-loader" },
                {
                    test: /\.css$/,
                    include: /\./,
                    loaders: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    loader: "source-map-loader"
                },
                { test: /\.(woff|woff2|ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=100000" }
            ]
        },
        externals: {
            jquery: 'jQuery',
            react: 'React',
            'react-dom': 'ReactDOM',
            //moment: 'moment',
            ace: 'ace',
            d3: 'd3',
            'react-router-dom': 'ReactRouterDOM',
        },
        optimization: {
            //splitChunks: {
            //    chunks: 'all',
            //}
            //minimizer: [new UglifyJsPlugin({
            //    test: /\.js(\?.*)?$/i,
            //    sourceMap: true
            //})],
        },
    }
};