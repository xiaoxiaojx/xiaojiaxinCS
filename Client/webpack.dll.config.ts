import * as webpack from "webpack";
import * as path from "path";

// async function getPackageJson() {
//     const json = await require("../package.json");
//     return json;
// }

// console.log(getPackageJson());

const joinDir = p => path.join(__dirname, p);

const config: webpack.Configuration = {
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
            name: "[name]_[hash]",
            context: "."
        })
    ]
};

export default config;