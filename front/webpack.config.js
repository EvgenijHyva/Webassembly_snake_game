const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./bootstrap.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "script.js"
	},
	mode: "development",
	plugins: [new CopyWebpackPlugin({
		patterns: [{
			from: "./index.html",
			to: "./"
		}]
	})],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: { 
							insert: 'head',
							injectType: 'singletonStyleTag' 
						},
					},
					"css-loader"
				],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
}