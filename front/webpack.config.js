const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./script.js",
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
	})]
}