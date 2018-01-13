import * as webpack from "webpack";
import * as path from "path";

const isProduction: boolean = process.env.NODE_ENV === "production";
const joinDir = p => path.join(__dirname, p);

console.log(`WebPack build dll in ${process.env.NODE_ENV} ...`);

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

const config: webpack.Configuration = {
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
        path: joinDir("../asset/build"),
        filename: "[name].js",
        library: "[name]_[hash]"
    },
    plugins: currentPlugins.concat([
        new webpack.DllPlugin({
            path: joinDir("../asset/build/[name].manifest.json"),
            name: "[name]_[hash]",
            context: "."
        })
    ])
};

export default config;