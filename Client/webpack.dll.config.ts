import * as webpack from "webpack";
import * as path from "path";

const joinDir = p => path.join(__dirname, p);

console.log(`WebPack build dll in ${process.env.NODE_ENV} ...`);

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
	})];
const currentPlugins = isProduction ? proPlugins : devPlugins;

*/
const config: webpack.Configuration & { mode: string } = {
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
        filename: "[name].js",
        library: "[name]_[hash]"
    },
    mode: process.env.NODE_ENV || "production",
    plugins: [
        new webpack.DllPlugin({
            path: joinDir("../asset/build/[name].manifest.json"),
            name: "[name]_[hash]",
            context: "."
        })
    ]
};

export default config;