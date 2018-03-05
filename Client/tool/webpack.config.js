"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var DllPlugin = require("/Users/bjb-lq-012/ezbuy/xjx/dll-webpack-plugin/lib/index.js");
var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr";
var isProduction = process.env.NODE_ENV === "production";
var commonsEntry = [];
if (!isProduction) {
    commonsEntry.unshift(hotMiddlewareScript);
}
var joinDir = function (p) { return path.join(__dirname, p); };
console.log("WebPack build in " + process.env.NODE_ENV + " ...");
/*
    webpack 4.1.0

const proPlugins: webpack.ResolvePlugin[] = [
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true
        }
    })
];
const devPlugins: webpack.ResolvePlugin[] = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    }),
    new webpack.HotModuleReplacementPlugin()];
const currentPlugins = isProduction ? proPlugins : devPlugins;
*/
var config = {
    entry: commonsEntry.concat([joinDir("../src/index.tsx")]),
    output: {
        path: joinDir("../dist"),
        publicPath: "./",
        filename: "js/[name].[hash].js",
        chunkFilename: "js/[name].[hash].chunk.js"
    },
    mode: process.env.NODE_ENV || "production",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
        alias: {
            common: joinDir("../src/common")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: joinDir("../src/index.html"),
            filename: "index.html"
        }),
        new DllPlugin({
            dllConfig: require("./webpack.dll.config.js")["default"]
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: "ts-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["stage-1", "env", "react"]
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                    publicPath: "../"
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "url-loader?limit=10000&name=images/[hash:8].[name].[ext]"
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    }
};
exports["default"] = config;
