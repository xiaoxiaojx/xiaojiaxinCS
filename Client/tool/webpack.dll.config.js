"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
var isProduction = process.env.NODE_ENV === "production";
var joinDir = function (p) { return path.join(__dirname, p); };
console.log("WebPack build dll in " + process.env.NODE_ENV + " ...");
var proPlugins = [
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
var devPlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    })
];
var currentPlugins = isProduction ? proPlugins : devPlugins;
var config = {
    entry: {
        commonDll: [
            "react",
            "react-dom",
            "mobx-react",
            "mobx",
            "history",
            "react-markdown",
            "react-quill",
            "react-swipe",
            "react-lazy-load",
            "swipe-js-iso"
        ],
        materialDll: ["material-ui"]
    },
    output: {
        path: joinDir("../dist/js"),
        filename: "[name].[hash].js",
        library: "[name]_[hash]"
    },
    plugins: currentPlugins.concat([
        new webpack.DllPlugin({
            path: joinDir("../dllWebpckPlugin/" + process.env.NODE_ENV + "/[name].manifest.json"),
            name: "[name]_[hash]",
            context: "."
        })
    ])
};
exports["default"] = config;
