"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
// async function getPackageJson() {
//     const json = await require("../package.json");
//     return json;
// }
// console.log(getPackageJson());
var joinDir = function (p) { return path.join(__dirname, p); };
var config = {
    entry: {
        bundle: [
            "react",
            "react-dom",
            "mobx-react",
            "mobx",
            "moment",
            "history",
            "material-ui",
            "react-markdown",
            "react-quill",
            "react-router",
            "react-router-dom",
            "react-swipe"
        ]
    },
    output: {
        path: joinDir("../dist/build"),
        filename: "[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: joinDir("../dist/build/bundle.manifest.json"),
            name: "[name]_[hash]"
        })
    ]
};
exports["default"] = config;
