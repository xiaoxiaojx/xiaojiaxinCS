import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as path from "path";

const DllPlugin = require("dll-webpack-plugin");

const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr";

const isProduction: boolean = process.env.NODE_ENV === "production";
const commonsEntry: string[] = [];

if ( !isProduction ) {
	commonsEntry.unshift(hotMiddlewareScript);
}

const joinDir = p => path.join(__dirname, p);

console.log(`WebPack build in ${process.env.NODE_ENV} ...`);

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

const config: webpack.Configuration = {
	entry: [...commonsEntry, joinDir("../src/index.tsx")],
  	output: {
		path: joinDir("../dist"),
		publicPath: "./",
		filename: "js/[name].[hash].js",
		chunkFilename: "js/[name].[hash].chunk.js"
  	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".scss"],
		alias: {
			common: joinDir("../src/common")
		}
  	},
  	plugins: currentPlugins.concat([
		new HtmlWebpackPlugin({
			template: joinDir("../src/index.html"),
			filename: "index.html"
		}),
		new DllPlugin({
			dllConfig: require("./webpack.dll.config.js").default,
		}),
		new ExtractTextPlugin("css/[name].css"),
		new webpack.NoEmitOnErrorsPlugin()
	]),
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
				query:
				{
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

export default config;